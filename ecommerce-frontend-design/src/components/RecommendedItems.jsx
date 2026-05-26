import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { formatPrice, getProductImage } from '../utils/productImage';

const RecommendedItems = ({ onProductSelect }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const page = await fetchProducts(0, 10);
        if (!cancelled) setItems(page.content || []);
      } catch {
        if (!cancelled) setError('Unable to load recommended items.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Recommended items</h3>

      {loading && <p className="text-[#8B96A5]">Loading recommendations...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex flex-col hover:shadow-[0px_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
              onClick={() => onProductSelect?.(item.id)}
              onKeyDown={(e) => e.key === 'Enter' && onProductSelect?.(item.id)}
            >
              <div className="flex-1 flex items-center justify-center p-4 mb-3">
                <img
                  src={getProductImage(item.image)}
                  alt={item.name}
                  className="max-h-[140px] w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="mt-auto">
                <p className="font-medium text-[#1C1C1C] text-lg mb-1">${formatPrice(item.price)}</p>
                <p className="text-[#8B96A5] text-[15px] overflow-hidden text-ellipsis line-clamp-2 leading-snug">
                  {item.description || item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedItems;
