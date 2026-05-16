import React, { useState } from 'react';
import { ChevronRight, Grid, List, ChevronDown, Star, Heart, X } from 'lucide-react';

// Import images for products
import canonImg from '../assets/Image/tech/image 29.png';
import actionImg from '../assets/Image/tech/6.png';
import laptopImg from '../assets/Image/tech/image 23.png';
import watchImg from '../assets/Image/tech/8.png';
import headphonesImg from '../assets/Image/tech/image 32.png';
import phone1 from '../assets/Image/tech/image 33.png';
import phone2 from '../assets/Image/tech/image 34.png';

const ProductListing = ({ setPage }) => {
  const [viewMode, setViewMode] = useState('grid'); // Default to grid as per new request

  const activeFilters = [
    "Samsung", "Apple", "Poco", "Metallic", "4 star", "3 star"
  ];

  const products = [
    {
      id: 1,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      oldPrice: "1128.00",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      image: phone1
    },
    {
      id: 2,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      oldPrice: "1128.00",
      rating: 5.9,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: phone2
    },
    {
      id: 3,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: phone1
    },
    {
      id: 4,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      oldPrice: "1128.00",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: laptopImg
    },
    {
      id: 5,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      oldPrice: "1128.00",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: canonImg
    },
    {
      id: 6,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: phone2
    },
    {
      id: 7,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      oldPrice: "1128.00",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: laptopImg
    },
    {
      id: 8,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      oldPrice: "1128.00",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: watchImg
    },
    {
      id: 9,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "99.50",
      rating: 7.5,
      orders: 154,
      shipping: "Free Shipping",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
      image: canonImg
    }
  ];

  return (
    <div className="container py-4">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
        <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPage('home')}>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="cursor-pointer hover:text-primary transition-colors">Clothings</span>
        <ChevronRight className="w-4 h-4" />
        <span className="cursor-pointer hover:text-primary transition-colors">Men's wear</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C1C] font-normal">Summer clothing</span>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className="w-[240px] flex-shrink-0 space-y-2">
          {/* Category */}
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Category <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <ul className="space-y-3 text-[#505050] text-sm">
              <li className="hover:text-primary cursor-pointer">Mobile accessory</li>
              <li className="hover:text-primary cursor-pointer">Electronics</li>
              <li className="hover:text-primary cursor-pointer">Smartphones</li>
              <li className="hover:text-primary cursor-pointer">Modern tech</li>
              <li className="text-primary cursor-pointer mt-1">See all</li>
            </ul>
          </div>

          {/* Brands */}
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Brands <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <div className="space-y-2">
              {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map(brand => (
                <label key={brand} className="flex items-center gap-3 text-[#1C1C1C] text-sm cursor-pointer group">
                  <input type="checkbox" defaultChecked={["Samsung", "Apple", "Pocco"].includes(brand)} className="w-4 h-4 rounded border-[#DEE2E7] text-primary focus:ring-primary" />
                  <span className="group-hover:text-primary transition-colors">{brand}</span>
                </label>
              ))}
              <div className="text-primary text-sm cursor-pointer pt-1">See all</div>
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Features <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <div className="space-y-2">
              {["Metallic", "Plastic cover", "8GB RAM", "Super power", "Large Memory"].map(feature => (
                <label key={feature} className="flex items-center gap-3 text-[#1C1C1C] text-sm cursor-pointer group">
                  <input type="checkbox" defaultChecked={feature === "Metallic"} className="w-4 h-4 rounded border-[#DEE2E7] text-primary focus:ring-primary" />
                  <span className="group-hover:text-primary transition-colors">{feature}</span>
                </label>
              ))}
              <div className="text-primary text-sm cursor-pointer pt-1">See all</div>
            </div>
          </div>

          {/* Price Range */}
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Price range <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <div className="space-y-4">
              <div className="relative h-6 flex items-center">
                <div className="w-full h-1 bg-[#DEE2E7] rounded"></div>
                <div className="absolute left-[20%] right-[30%] h-1 bg-primary rounded"></div>
                <div className="absolute left-[20%] w-4 h-4 bg-white border-2 border-primary rounded-full -ml-2"></div>
                <div className="absolute right-[30%] w-4 h-4 bg-white border-2 border-primary rounded-full -mr-2"></div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-[#1C1C1C] text-xs mb-1">Min</p>
                  <input type="text" placeholder="0" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[#1C1C1C] text-xs mb-1">Max</p>
                  <input type="text" placeholder="999999" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <button className="w-full bg-white border border-[#DEE2E7] text-primary py-2 rounded-md text-sm font-medium hover:bg-shade transition-colors shadow-sm">
                Apply
              </button>
            </div>
          </div>

          {/* Condition */}
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Condition <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <div className="space-y-2">
              {["Any", "Refurbished", "Brand new", "Old items"].map((cond, i) => (
                <label key={cond} className="flex items-center gap-3 text-[#1C1C1C] text-sm cursor-pointer group">
                  <input type="radio" name="condition" defaultChecked={i === 0} className="w-4 h-4 border-[#DEE2E7] text-primary focus:ring-primary" />
                  <span className="group-hover:text-primary transition-colors">{cond}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="border-t border-[#DEE2E7] py-3 pb-4">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Ratings <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <div className="space-y-2">
              {[5, 4, 3, 2].map((stars) => (
                <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked={stars >= 3 && stars <= 4} className="w-4 h-4 rounded border-[#DEE2E7] text-primary focus:ring-primary" />
                  <div className="flex gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={14} className={i < stars ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex items-center justify-between mb-4">
            <span className="text-[#1C1C1C] text-sm">12,911 items in <span className="font-bold">Mobile accessory</span></span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-normal">
                <input type="checkbox" className="w-4 h-4 rounded border-[#DEE2E7] text-primary focus:ring-primary" />
                <span>Verified only</span>
              </label>
              <div className="flex items-center gap-2 border border-[#DEE2E7] rounded-md px-3 py-1 bg-white cursor-pointer hover:bg-shade transition-colors">
                <span className="text-sm">Featured</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </div>
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
                <div
                  className={`p-2 border-r border-[#DEE2E7] cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-[#EFF2F4]' : 'hover:bg-shade'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} className="text-[#1C1C1C]" />
                </div>
                <div
                  className={`p-2 cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-[#EFF2F4]' : 'hover:bg-shade'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} className="text-[#1C1C1C]" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters / Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilters.map((filter, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md bg-white text-dark text-sm">
                <span>{filter}</span>
                <X size={14} className="text-[#8B96A5] cursor-pointer hover:text-dark" />
              </div>
            ))}
            <button className="text-primary text-sm font-normal hover:underline ml-2">
              Clear all filter
            </button>
          </div>

          {viewMode === 'list' ? (
            /* Product List View */
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="bg-white border border-[#DEE2E7] rounded-lg p-5 flex gap-6 hover:shadow-md transition-shadow group cursor-pointer relative" onClick={() => setPage('details')}>
                  {/* Product Image area */}
                  <div className="w-[210px] h-[210px] lg:w-[240px] lg:h-[240px] flex-shrink-0 flex items-center justify-center bg-[#F7F7F7] rounded-lg p-6 relative overflow-hidden group">
                    <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute right-5 top-5 w-10 h-10 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" onClick={(e) => e.stopPropagation()}>
                    <Heart size={20} />
                  </button>

                  {/* Product Info */}
                  <div className="flex-1 py-1">
                    <h3 className="text-[#1C1C1C] text-base font-semibold group-hover:text-primary transition-colors mb-3">{product.title}</h3>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-[#1C1C1C]">${product.price}</span>
                        {product.oldPrice && <span className="text-[#8B96A5] line-through text-sm mt-0.5">${product.oldPrice}</span>}
                      </div>
                    </div>

                    {/* Rating Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} size={14} className={i < Math.floor(product.rating / 2) ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />
                        ))}
                      </div>
                      <span className="text-[#FF9017] text-sm font-medium">{product.rating}</span>
                      <span className="text-[#8B96A5] text-sm ml-2">• {product.orders} orders</span>
                      <span className="text-[#00B517] text-sm font-medium ml-2">• {product.shipping}</span>
                    </div>

                    <p className="text-[#505050] text-sm leading-relaxed mb-4 line-clamp-2 max-w-2xl">
                      {product.desc}
                    </p>

                    <button className="text-primary font-bold text-sm bg-transparent border-none p-0 hover:underline">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Product Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#DEE2E7] rounded-lg p-4 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center cursor-pointer"
                  onClick={() => setPage('details')}
                >
                  {/* Product Image Area */}
                  <div className="w-full aspect-square flex items-center justify-center mb-4 bg-[#F7F7F7] rounded-md p-6 overflow-hidden">
                    <img src={product.image} alt={product.title} className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Product Info Area */}
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#1C1C1C]">${product.price}</span>
                          <button className="w-8 h-8 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" onClick={(e) => e.stopPropagation()}>
                            <Heart size={16} />
                          </button>
                        </div>
                        {product.oldPrice && <span className="text-[#8B96A5] line-through text-xs">${product.oldPrice}</span>}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} size={12} className={i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />
                        ))}
                      </div>
                      <span className="text-[#FF9017] text-xs font-medium">{product.rating}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[#505050] text-[13px] leading-[1.4] line-clamp-2 hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-3">
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
                <div className="px-3 py-2 border-r border-[#DEE2E7] cursor-pointer hover:bg-shade transition-colors flex items-center">
                  <span className="text-secondary text-sm">Show 10</span>
                  <ChevronDown size={14} className="ml-2" />
                </div>
              </div>
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
                <div className="px-3 py-2 border-r border-[#DEE2E7] opacity-30 cursor-not-allowed text-dark flex items-center">{"<"}</div>
                <div className="px-4 py-2 border-r border-[#DEE2E7] bg-white hover:bg-shade font-bold text-dark text-sm cursor-pointer">1</div>
                <div className="px-4 py-2 border-r border-[#DEE2E7] hover:bg-shade cursor-pointer text-dark text-sm transition-colors">2</div>
                <div className="px-4 py-2 border-r border-[#DEE2E7] hover:bg-shade cursor-pointer text-dark text-sm transition-colors">3</div>
                <div className="px-3 py-2 hover:bg-shade cursor-pointer text-dark flex items-center transition-colors shadow-sm">{">"}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
