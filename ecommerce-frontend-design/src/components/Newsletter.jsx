import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="bg-shade py-12 flex flex-col items-center text-center">
      <h3 className="text-xl font-bold text-dark mb-1">Subscribe on our newsletter</h3>
      <p className="text-secondary mb-8">Get daily news on upcoming offers from many suppliers all over the world</p>
      
      <form className="flex gap-2 w-full max-w-md">
        <div className="flex-1 relative">
           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
           <input 
            type="email" 
            placeholder="Email" 
            className="w-full pl-10 pr-4 py-2 border border-shade-border rounded-md outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition-colors">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
