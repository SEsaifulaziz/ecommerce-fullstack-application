import React, { useEffect, useState } from 'react';
import { ChevronRight, Grid, List, ChevronDown, Star, Heart, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice, getProductImage } from '../utils/productImage';

const CATEGORIES = ['Electronics', 'Furniture', 'Accessories', 'Apparel'];

const ProductListing = ({ setPage, onProductSelect }) => {
  const { loadProducts, searchQuery, categoryFilter, setCategoryFilter } = useApp();
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [size] = useState(9);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await loadProducts({
          search: searchQuery,
          category: categoryFilter,
          page,
          size,
        });
        if (cancelled) return;
        setProducts(data.content || []);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
      } catch {
        if (!cancelled) {
          setError('Failed to load products. Check that the backend is running and VITE_API_BASE_URL is correct.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [loadProducts, searchQuery, categoryFilter, page, size]);

  const handleProductClick = (productId) => {
    onProductSelect?.(productId);
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    setPageNum(0);
  };

  return (
    <div className="container py-4">
      <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
        <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPage('home')}>
          Home
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C1C] font-normal">Products</span>
      </div>

      <div className="flex gap-6">
        <aside className="w-[240px] flex-shrink-0 space-y-2 hidden lg:block">
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3">Category</h4>
            <ul className="space-y-3 text-[#505050] text-sm">
              <li>
                <button type="button" className="hover:text-primary" onClick={() => handleCategoryClick('')}>
                  All products
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    className={`hover:text-primary ${categoryFilter === cat ? 'text-primary font-medium' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex items-center justify-between mb-4">
            <span className="text-[#1C1C1C] text-sm">
              {totalElements} items
              {categoryFilter ? (
                <>
                  {' '}
                  in <span className="font-bold">{categoryFilter}</span>
                </>
              ) : null}
              {searchQuery ? (
                <>
                  {' '}
                  matching &quot;<span className="font-bold">{searchQuery}</span>&quot;
                </>
              ) : null}
            </span>
            <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
              <div
                className={`p-2 border-r border-[#DEE2E7] cursor-pointer ${viewMode === 'grid' ? 'bg-[#EFF2F4]' : 'hover:bg-shade'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </div>
              <div
                className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-[#EFF2F4]' : 'hover:bg-shade'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </div>
            </div>
          </div>

          {loading && <p className="text-center text-[#8B96A5] py-12">Loading products...</p>}
          {error && <p className="text-center text-red-600 py-12 text-sm">{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-[#8B96A5] py-12">No products found.</p>
          )}

          {!loading && !error && products.length > 0 && viewMode === 'list' && (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#DEE2E7] rounded-lg p-5 flex gap-6 hover:shadow-md transition-shadow group cursor-pointer relative"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="w-[210px] h-[210px] flex-shrink-0 flex items-center justify-center bg-[#F7F7F7] rounded-lg p-6">
                    <img src={getProductImage(product.image)} alt={product.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <button
                    type="button"
                    className="absolute right-5 top-5 w-10 h-10 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart size={20} />
                  </button>
                  <div className="flex-1 py-1">
                    <h3 className="text-base font-semibold group-hover:text-primary mb-3">{product.name}</h3>
                    <span className="text-xl font-bold">${formatPrice(product.price)}</span>
                    <p className="text-[#505050] text-sm mt-3 line-clamp-2">{product.description}</p>
                    <p className="text-[#8B96A5] text-sm mt-2">Category: {product.category} • Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && products.length > 0 && viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#DEE2E7] rounded-lg p-4 hover:shadow-lg transition-all group flex flex-col cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="w-full aspect-square flex items-center justify-center mb-4 bg-[#F7F7F7] rounded-md p-6">
                    <img src={getProductImage(product.image)} alt={product.name} className="max-w-[85%] max-h-[85%] object-contain" />
                  </div>
                  <div className="w-full">
                    <span className="text-lg font-bold">${formatPrice(product.price)}</span>
                    <div className="flex items-center gap-1 my-2">
                      <Star size={12} className="fill-[#FF9017] text-[#FF9017]" />
                      <span className="text-[#8B96A5] text-xs">{product.category}</span>
                    </div>
                    <h3 className="text-[#505050] text-[13px] line-clamp-2 group-hover:text-primary">{product.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex justify-end mt-8 gap-2">
              <button
                type="button"
                disabled={page === 0}
                className="px-4 py-2 border rounded-md disabled:opacity-40"
                onClick={() => setPageNum((p) => Math.max(0, p - 1))}
              >
                Prev
              </button>
              <span className="px-4 py-2 text-sm text-[#505050]">
                Page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages - 1}
                className="px-4 py-2 border rounded-md disabled:opacity-40"
                onClick={() => setPageNum((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
