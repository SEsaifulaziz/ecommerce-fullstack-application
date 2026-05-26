import React, { useEffect, useState } from 'react';
import { Star, Heart, MessageSquare, ShoppingBag, ShieldCheck, Globe, ChevronRight, Check } from 'lucide-react';
import flagDE from '../assets/Layout1/Image/flags/DE@2x.png';
import { useApp } from '../context/AppContext';
import { fetchProducts } from '../api/products';
import { formatPrice, getProductImage } from '../utils/productImage';

const ProductDetails = ({ setPage }) => {
  const { selectedProduct, selectedProductId, addToCart, openProduct } = useApp();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!selectedProduct?.category) return;

    let cancelled = false;

    fetchProducts(0, 6)
      .then((page) => {
        if (cancelled) return;
        const items = (page.content || []).filter((p) => p.id !== selectedProduct.id).slice(0, 4);
        setRelated(items);
      })
      .catch(() => {
        if (!cancelled) setRelated([]);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProduct]);

  if (!selectedProductId) {
    return (
      <div className="container py-12 text-center">
        <p className="text-[#8B96A5] mb-4">Select a product from the listing first.</p>
        <button type="button" className="text-primary font-medium" onClick={() => setPage('listing')}>
          Browse products
        </button>
      </div>
    );
  }

  if (!selectedProduct) {
    return <div className="container py-12 text-center text-[#8B96A5]">Loading product details...</div>;
  }

  const inStock = selectedProduct.stock > 0;
  const image = getProductImage(selectedProduct.image);

  return (
    <div className="container py-4">
      <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
        <span className="cursor-pointer hover:text-primary" onClick={() => setPage('home')}>
          Home
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C1C]">{selectedProduct.category}</span>
      </div>

      <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 lg:p-8 flex flex-col lg:flex-row gap-8 mb-8 shadow-sm">
        <div className="lg:w-[450px] flex-shrink-0">
          <div className="border border-[#DEE2E7] rounded-lg p-8 mb-4 flex items-center justify-center bg-[#F7F7F7] aspect-square">
            <img src={image} alt={selectedProduct.name} className="max-w-full max-h-full object-contain" />
          </div>
        </div>

        <div className="flex-1">
          <div className={`flex items-center gap-2 mb-2 ${inStock ? 'text-[#00B517]' : 'text-red-600'}`}>
            <Check size={20} />
            <span className="text-sm font-medium">{inStock ? 'In stock' : 'Out of stock'}</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#1C1C1C] mb-4">{selectedProduct.name}</h1>

          <div className="flex items-center gap-4 mb-4 text-[#8B96A5] text-sm">
            <div className="flex items-center gap-1">
              <MessageSquare size={16} />
              <span>{selectedProduct.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingBag size={16} />
              <span>{selectedProduct.stock} available</span>
            </div>
          </div>

          <div className="bg-[#FFF0DF] p-4 rounded-lg mb-6">
            <span className="text-3xl font-bold text-[#FA3434]">${formatPrice(selectedProduct.price)}</span>
          </div>

          <p className="text-[#505050] text-sm leading-relaxed mb-8">{selectedProduct.description}</p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="flex-1 min-w-[150px] bg-primary text-white py-3 rounded-lg font-bold disabled:opacity-50"
              disabled={!inStock}
              onClick={() => {
                addToCart(selectedProduct, 1);
                setPage('cart');
              }}
            >
              Buy Now
            </button>
            <button
              type="button"
              className="flex-1 min-w-[150px] bg-[#E3F0FF] text-primary py-3 rounded-lg font-bold disabled:opacity-50"
              disabled={!inStock}
              onClick={() => addToCart(selectedProduct, 1)}
            >
              Add to Cart
            </button>
            <button type="button" className="w-12 h-12 flex items-center justify-center border border-[#DEE2E7] rounded-lg text-primary">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="lg:w-[280px] space-y-4">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md bg-[#E3F0FF] flex items-center justify-center text-primary font-bold uppercase">
                B
              </div>
              <div>
                <span className="text-[#1C1C1C] font-normal">Supplier</span>
                <span className="text-[#505050] text-sm block">Brand Store</span>
              </div>
            </div>
            <div className="space-y-3 mb-5 text-sm text-[#8B96A5]">
              <div className="flex items-center gap-3">
                <img src={flagDE} alt="DE" className="w-5 h-3 rounded-sm" />
                <span>Germany, Berlin</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                <span>Verified Seller</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} />
                <span>Worldwide shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 lg:p-6 mb-8">
          <h4 className="font-bold text-[#1C1C1C] text-lg mb-4">Related products</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 group cursor-pointer"
                onClick={() => openProduct(item.id)}
              >
                <div className="aspect-square border border-[#DEE2E7] rounded-lg p-3 flex items-center justify-center bg-white">
                  <img src={getProductImage(item.image)} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>
                <span className="text-sm line-clamp-2 group-hover:text-primary">{item.name}</span>
                <span className="text-[#8B96A5] text-sm">${formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
