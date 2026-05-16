import React from 'react';
import { ChevronDown, ArrowLeft, Trash2, Heart, ShieldCheck, Truck, MessageSquare } from 'lucide-react';

// Import some images for the cart items
import item1 from '../assets/Image/tech/6.png';
import item2 from '../assets/Image/tech/8.png';
import item3 from '../assets/Image/tech/image 23.png';

const Cart = ({ setPage }) => {
    const cartItems = [
        {
            id: 1,
            title: "T-shirts with multiple colors, for men and lady",
            specs: "Size: medium, Color: blue, Material: Plastic",
            seller: "Artel Market",
            price: 78.99,
            qty: 9,
            image: item1
        },
        {
            id: 2,
            title: "T-shirts with multiple colors, for men and lady",
            specs: "Size: medium, Color: blue, Material: Plastic",
            seller: "Best factory LLC",
            price: 39.00,
            qty: 3,
            image: item2
        },
        {
            id: 3,
            title: "T-shirts with multiple colors, for men and lady",
            specs: "Size: medium, Color: blue, Material: Plastic",
            seller: "Artel Market",
            price: 170.50,
            qty: 1,
            image: item3
        }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discount = 60.00;
    const tax = 14.00;
    const total = subtotal - discount + tax;

    return (
        <div className="container py-6">
            <h1 className="text-2xl font-bold text-[#1C1C1C] mb-6">My cart ({cartItems.length})</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Section: Cart Items */}
                <div className="flex-1 space-y-4">
                    <div className="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden">
                        {cartItems.map((item, index) => (
                            <div key={item.id} className={`p-4 lg:p-6 flex flex-col sm:flex-row gap-4 lg:gap-6 ${index !== cartItems.length - 1 ? 'border-b border-[#DEE2E7]' : ''}`}>
                                {/* Product Image */}
                                <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] border border-[#DEE2E7] rounded-lg p-3 flex items-center justify-center bg-[#F7F7F7] flex-shrink-0 group overflow-hidden">
                                    <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
                                    <div className="space-y-1.5">
                                        <h3 className="font-semibold text-[#1C1C1C] hover:text-primary cursor-pointer transition-colors max-w-md">{item.title}</h3>
                                        <div className="text-[#8B96A5] text-sm space-y-0.5">
                                            <p>{item.specs}</p>
                                            <p>Seller: {item.seller}</p>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <button className="px-3 py-1.5 border border-[#DEE2E7] rounded-md text-[#FA3434] text-xs font-semibold hover:bg-[#FFF0F0] transition-colors flex items-center gap-1.5">
                                                Remove
                                            </button>
                                            <button className="px-3 py-1.5 border border-[#DEE2E7] rounded-md text-primary text-xs font-semibold hover:bg-shade transition-colors flex items-center gap-1.5">
                                                Save for later
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 min-w-[120px]">
                                        <span className="text-lg font-bold text-[#1C1C1C]">${item.price.toFixed(2)}</span>
                                        <div className="flex items-center gap-2 border border-[#DEE2E7] rounded-md px-3 py-2 bg-white cursor-pointer hover:bg-shade transition-colors">
                                            <span className="text-sm">Qty: {item.qty}</span>
                                            <ChevronDown size={14} className="opacity-50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-[#DEE2E7]">
                        <button
                            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors"
                            onClick={() => setPage('listing')}
                        >
                            <ArrowLeft size={18} />
                            Back to shop
                        </button>
                        <button className="text-primary font-bold hover:underline">
                            Remove all
                        </button>
                    </div>

                    {/* Benefits Bar */}
                    <div className="flex flex-wrap gap-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#DEE2E7] flex items-center justify-center text-[#8B96A5]">
                                <ShieldCheck size={20} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[#1C1C1C] font-semibold text-sm">Secure Payment</p>
                                <p className="text-[#8B96A5] text-xs">Have you ever heard that?</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#DEE2E7] flex items-center justify-center text-[#8B96A5]">
                                <MessageSquare size={20} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[#1C1C1C] font-semibold text-sm">Customer Support</p>
                                <p className="text-[#8B96A5] text-xs">Have you ever heard that?</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#DEE2E7] flex items-center justify-center text-[#8B96A5]">
                                <Truck size={20} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[#1C1C1C] font-semibold text-sm">Free Delivery</p>
                                <p className="text-[#8B96A5] text-xs">Have you ever heard that?</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Summary */}
                <div className="lg:w-[280px] space-y-4">
                    {/* Coupon */}
                    <div className="bg-white border border-[#DEE2E7] rounded-lg p-5">
                        <p className="text-[#505050] text-sm mb-3">Have a coupon?</p>
                        <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
                            <input type="text" placeholder="Add coupon" className="flex-1 px-3 py-2 outline-none text-sm" />
                            <button className="bg-white border-l border-[#DEE2E7] px-4 py-2 text-primary font-bold text-sm hover:bg-shade transition-colors">Apply</button>
                        </div>
                    </div>

                    {/* Price Calculations */}
                    <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 shadow-sm">
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-[#505050]">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[#FA3434]">
                                <span>Discount:</span>
                                <span>- ${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[#00B517]">
                                <span>Tax:</span>
                                <span>+ ${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="h-[1px] bg-[#DEE2E7] mb-4"></div>

                        <div className="flex justify-between text-lg font-bold text-[#1C1C1C] mb-6">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-[#00B517] hover:bg-[#00A015] text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
                            Checkout
                        </button>

                        <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-60">
                            {/* Payment icon placeholders */}
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
