import React from 'react';

const CategorySection = ({ title, bannerImg, items, bannerBg }) => {
  return (
    <section className="bg-white border border-[#DEE2E7] rounded-lg mt-6 flex flex-col lg:flex-row overflow-hidden">
      {/* Banner */}
      <div
        className="w-72 p-6 flex flex-col justify-start relative overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundColor: bannerBg || '#F7F7F7', backgroundImage: `url("${bannerImg}")` }}
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-dark w-40 leading-tight mb-4">{title}</h3>
          <button className="bg-white text-dark px-4 py-2 rounded-md font-medium text-sm hover:bg-shade transition-colors shadow-sm">
            Source now
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-5 border-r border-b last:border-r-0 border-[#DEE2E7] flex justify-between cursor-pointer hover:bg-white hover:shadow-[0px_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 group h-[130px] relative hover:z-10"
          >
            <div className="flex flex-col">
              <span className="text-[#1C1C1C] text-sm font-medium group-hover:text-primary transition-colors mb-1">{item.name}</span>
              <span className="text-[#8B96A5] text-xs">From <br /> USD {item.price}</span>
            </div>
            <div className="w-[82px] h-[82px] self-end -mr-1 -mb-1">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
