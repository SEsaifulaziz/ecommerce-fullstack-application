import React from 'react';
import bgImg from '../assets/Image/backgrounds/image 107.png';

const InquiryForm = () => {
  return (
    <section 
        className="relative mt-6 rounded-lg overflow-hidden h-[400px] flex items-center bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url("${bgImg}")` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C7CF1]/80 to-[#127FFF]/60 z-0"></div>
      
      <div className="container relative z-10 flex flex-col lg:flex-row justify-between items-center text-white p-8 lg:p-12">
        <div className="max-w-md mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold mb-6 leading-tight">An easy way to send requests to all suppliers</h2>
          <p className="text-white opacity-90 hidden md:block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-xl w-full max-w-[440px] text-dark">
          <h3 className="text-lg font-bold mb-6">Send quote to suppliers</h3>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="What item you need?" 
              className="w-full px-4 py-2 border border-shade-border rounded-md focus:ring-1 focus:ring-primary outline-none"
            />
            <textarea 
              placeholder="Type more details" 
              className="w-full px-4 py-2 border border-shade-border rounded-md h-24 focus:ring-1 focus:ring-primary outline-none resize-none"
            ></textarea>
            <div className="flex gap-4">
               <input 
                type="text" 
                placeholder="Quantity" 
                className="flex-1 px-4 py-2 border border-shade-border rounded-md outline-none"
              />
               <select className="px-4 py-2 border border-shade-border rounded-md bg-white outline-none">
                 <option>Pcs</option>
                 <option>Kgs</option>
               </select>
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition-colors">
              Send inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
