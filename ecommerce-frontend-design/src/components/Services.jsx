import React from 'react';
import { Search, Package, Plane, ShieldCheck } from 'lucide-react';

// Import images for services
import bg1 from '../assets/Image/backgrounds/Mask group.png';
import bg2 from '../assets/Image/backgrounds/Mask group (1).png';
import bg3 from '../assets/Image/backgrounds/image 107.png';
import bg4 from '../assets/Image/backgrounds/image 106.png';

const Services = () => {
  const services = [
    { title: "Source from Industry Hubs", icon: <Search className="w-5 h-5" />, image: bg1 },
    { title: "Customize Your Products", icon: <Package className="w-5 h-5" />, image: bg2 },
    { title: "Fast, reliable shipping by ocean or air", icon: <Plane className="w-5 h-5" />, image: bg3 },
    { title: "Product monitoring and inspection", icon: <ShieldCheck className="w-5 h-5" />, image: bg4 }
  ];

  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold text-dark mb-6">Our extra services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white border border-shade-border rounded-lg relative group cursor-pointer overflow-hidden transition-shadow hover:shadow-md">
             {/* Service Image Section */}
             <div className="h-32 bg-gray-200 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay to darken slightly like in the screenshot */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
             </div>

             {/* Service Text Section */}
             <div className="p-4 bg-white relative">
                {/* Icon circle floating between image and text section */}
                <div className="absolute -top-7 right-6 w-14 h-14 rounded-full border-2 border-white bg-[#D1E9FF] flex items-center justify-center text-dark group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                  {service.icon}
                </div>
                {/* Title split into two lines if needed by container width */}
                <p className="font-medium text-dark text-base leading-[1.3] w-4/5 pb-2">
                  {service.title}
                </p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
