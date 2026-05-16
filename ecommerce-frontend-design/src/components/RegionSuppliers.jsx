import React from 'react';

// Import flag images
import flagAE from '../assets/Layout1/Image/flags/AE@2x.png';
import flagAU from '../assets/Layout1/Image/flags/icon.png'; // Using icon for AU as AU@2x is missing in list
import flagUS from '../assets/Layout1/Image/flags/US@2x.png';
import flagRU from '../assets/Layout1/Image/flags/RU@2x.png';
import flagIT from '../assets/Layout1/Image/flags/IT@2x.png';
import flagDK from '../assets/Layout1/Image/flags/DK@2x.png';
import flagFR from '../assets/Layout1/Image/flags/FR@2x.png';
import flagCN from '../assets/Layout1/Image/flags/CN@2x.png';
import flagGB from '../assets/Layout1/Image/flags/GB@2x.png';

const RegionSuppliers = () => {
  const regions = [
    { name: "Arabic Emirates", domain: "shopname.ae", flagImg: flagAE },
    { name: "Australia", domain: "shopname.au", flagImg: flagAU },
    { name: "United States", domain: "shopname.us", flagImg: flagUS },
    { name: "Russia", domain: "shopname.ru", flagImg: flagRU },
    { name: "Italy", domain: "shopname.it", flagImg: flagIT },
    { name: "Denmark", domain: "shopname.dk", flagImg: flagDK },
    { name: "France", domain: "shopname.fr", flagImg: flagFR },
    { name: "China", domain: "shopname.ae", flagImg: flagCN },
    { name: "Great Britain", domain: "shopname.co.uk", flagImg: flagGB }
  ];

  return (
    <section className="mt-8 mb-12">
      <h3 className="text-2xl font-bold mb-6">Suppliers by region</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-6">
        {regions.map((region, index) => (
          <div key={index} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-white hover:shadow-[0px_4px_15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-7 h-5 overflow-hidden rounded-sm shadow-sm flex-shrink-0">
              <img src={region.flagImg} alt={region.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-dark text-sm group-hover:text-primary transition-colors font-medium">{region.name}</span>
              <span className="text-secondary text-xs opacity-60">{region.domain}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RegionSuppliers;
