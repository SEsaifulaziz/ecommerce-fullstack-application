import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice, getProductImage } from '../utils/productImage';

const Cart = ({ setPage }) => {
  const { cart, updateCartQty, removeFromCart, clearCart } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          type="button"
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold"
          onClick={() => setPage('listing')}
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold text-[#1C1C1C] mb-6">My cart ({cart.length})</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 lg:p-6 flex flex-col sm:flex-row gap-4 lg:gap-6 ${index !== cart.length - 1 ? 'border-b border-[#DEE2E7]' : ''}`}
              >
                <div className="w-[100px] h-[100px] border border-[#DEE2E7] rounded-lg p-3 flex items-center justify-center bg-[#F7F7F7] flex-shrink-0">
                  <img src={getProductImage(item.image)} alt={item.title} className="max-w-full max-h-full object-contain" />
                </div>

                <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-[#1C1C1C] max-w-md">{item.title}</h3>
                    <p className="text-[#8B96A5] text-sm">{item.specs}</p>
                    <p className="text-[#8B96A5] text-sm">Seller: {item.seller}</p>
                    <button
                      type="button"
                      className="px-3 py-1.5 border border-[#DEE2E7] rounded-md text-[#FA3434] text-xs font-semibold mt-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="text-lg font-bold">${formatPrice(item.price)}</span>
                    <input
                      type="number"
                      min={1}
                      max={item.stock || 99}
                      value={item.qty}
                      onChange={(e) => updateCartQty(item.id, Number(e.target.value))}
                      className="w-20 border border-[#DEE2E7] rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-[#DEE2E7]">
            <button
              type="button"
              className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-bold"
              onClick={() => setPage('listing')}
            >
              <ArrowLeft size={18} />
              Back to shop
            </button>
            <button type="button" className="text-primary font-bold hover:underline" onClick={clearCart}>
              Remove all
            </button>
          </div>

          <div className="flex flex-wrap gap-6 py-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#8B96A5]" />
              <span className="text-sm font-semibold">Secure Payment</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-[#8B96A5]" />
              <span className="text-sm font-semibold">Customer Support</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-[#8B96A5]" />
              <span className="text-sm font-semibold">Free Delivery</span>
            </div>
          </div>
        </div>

        <div className="lg:w-[280px]">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 shadow-sm">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-[#505050]">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#00B517]">
                <span>Tax (10%):</span>
                <span>+ ${formatPrice(tax)}</span>
              </div>
            </div>
            <div className="h-[1px] bg-[#DEE2E7] mb-4" />
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total:</span>
              <span>${formatPrice(total)}</span>
            </div>
            <button type="button" className="w-full bg-[#00B517] text-white py-4 rounded-lg font-bold text-lg">
              Checkout
            </button>
            <p className="text-xs text-[#8B96A5] mt-3 text-center">Checkout saves cart locally; orders API is not in backend yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
