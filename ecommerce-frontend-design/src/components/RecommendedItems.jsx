import React from 'react';

// Import some images for recommendations
import shirtImg from '../assets/Image/interior/1.png';
import shortImg from '../assets/Image/interior/3.png';
import coatImg from '../assets/Image/interior/6.png';
import bagImg from '../assets/Image/tech/image 23.png';
import walletImg from '../assets/Image/interior/7.png';
import cameraImg from '../assets/Image/tech/image 29.png';
import headsetImg from '../assets/Image/tech/image 32.png';
import smartWatchImg from '../assets/Image/tech/8.png';
import cupImg from '../assets/Image/interior/9.png';
import blenderImg from '../assets/Image/interior/8.png';

const RecommendedItems = () => {
  const items = [
    { price: "10.30", desc: "T-shirts with multiple colors, for men", image: shirtImg },
    { price: "10.30", desc: "Jeans shorts for men blue color", image: shortImg },
    { price: "12.50", desc: "Brown winter coat medium size", image: coatImg },
    { price: "34.00", desc: "Jeans bag for travel for men", image: bagImg },
    { price: "99.00", desc: "Leather wallet", image: walletImg },
    { price: "9.99", desc: "Canon camera 20x zoom, silver color", image: cameraImg },
    { price: "8.99", desc: "Headset for gaming with mic", image: headsetImg },
    { price: "10.30", desc: "Smart watch silver color", image: smartWatchImg },
    { price: "10.30", desc: "Blue wallet for men", image: cupImg },
    { price: "80.00", desc: "Leather bag for travel", image: blenderImg },
  ];

  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Recommended items</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex flex-col hover:shadow-[0px_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
          >
            <div className="flex-1 flex items-center justify-center p-4 mb-3">
              <img src={item.image} alt={item.desc} className="max-h-[140px] w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="mt-auto">
              <p className="font-medium text-[#1C1C1C] text-lg mb-1">${item.price}</p>
              <p className="text-[#8B96A5] text-[15px] overflow-hidden text-ellipsis line-clamp-2 leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedItems;
