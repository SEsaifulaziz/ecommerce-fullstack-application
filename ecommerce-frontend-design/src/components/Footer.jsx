import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Apple, Play, ChevronUp } from 'lucide-react';
import logo from '../assets/Layout/Brand/logo-colored.png';
import flagUS from '../assets/Layout1/Image/flags/US@2x.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-shade-border pt-12">
      <div className="container pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-3">
            <div className="mb-4">
               <img src={logo} alt="Brand" className="h-[46px]" />
            </div>
            <p className="text-[#505050] text-[#1C1C1C] opacity-80 max-w-xs mb-6 text-sm leading-relaxed">
              Best information about the company gies here but now lorem ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-[#BDC4CD] flex items-center justify-center text-white hover:bg-primary transition-all">
                  <Icon className="w-4 h-4 fill-current" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-[#1C1C1C] mb-4">About</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Find store</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blogs</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-bold text-[#1C1C1C] mb-4">Partnership</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Find store</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blogs</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-bold text-[#1C1C1C] mb-4">Information</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Money Refund</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact us</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="font-bold text-[#1C1C1C] mb-4">For users</h4>
            <ul className="space-y-3 text-[#8B96A5] text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Login</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Register</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Settings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">My Orders</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-[#1C1C1C] mb-4">Get app</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="bg-[#1C1C1C] text-white flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-90 transition-opacity w-[140px]">
                <Apple size={20} fill="white" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase leading-none">Download on the</span>
                  <span className="text-[12px] font-bold leading-none">App Store</span>
                </div>
              </a>
              <a href="#" className="bg-[#1C1C1C] text-white flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-90 transition-opacity w-[140px]">
                <Play size={20} fill="white" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase leading-none">GET IT ON</span>
                  <span className="text-[12px] font-bold leading-none">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#EFF2F4] border-t border-[#DEE2E7] py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#606060] text-sm">© 2023 Ecommerce.</p>
          <div className="flex items-center gap-4 text-dark text-sm">
             <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
               <img src={flagUS} alt="US" className="w-[20px] h-[14px]" />
               <span>English</span>
               <ChevronUp className="w-4 h-4 text-[#8B96A5]" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
