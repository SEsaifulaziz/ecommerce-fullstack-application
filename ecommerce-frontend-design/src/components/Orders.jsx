import React from 'react';
import item1 from '../assets/Image/tech/6.png';
import item2 from '../assets/Image/tech/8.png';

const Orders = ({ setPage }) => {
    const orderItems = [
        { id: 112, title: "GoPro HERO6 4K Action Camera - Black", date: "March 10, 2024", total: "$154.00", image: item1 },
        { id: 113, title: "Smart Watch with Heart Rate Monitor", date: "March 08, 2024", total: "$89.50", image: item2 }
    ];

    return (
        <div className="container py-8">
            <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Recent Orders</h1>
                <div className="space-y-6">
                    {orderItems.map((order) => (
                        <div key={order.id} className="border border-[#DEE2E7] rounded-lg overflow-hidden">
                            <div className="bg-[#F7FAFC] p-4 border-b border-[#DEE2E7] flex justify-between items-center whitespace-nowrap overflow-x-auto no-scrollbar gap-4">
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <p className="text-[#8B96A5]">ORDER PLACED</p>
                                        <p className="font-medium">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#8B96A5]">TOTAL</p>
                                        <p className="font-medium">{order.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#8B96A5]">SHIP TO</p>
                                        <p className="font-medium text-primary cursor-pointer hover:underline">John Doe</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#8B96A5] text-sm text-right">ORDER # 112-987654-{order.id}</p>
                                </div>
                            </div>
                            <div className="p-6 flex gap-6">
                                <div className="w-20 h-20 bg-white border border-[#DEE2E7] rounded p-2 flex items-center justify-center">
                                    <img src={order.image} alt={order.title} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-primary hover:underline cursor-pointer mb-2">{order.title}</h3>
                                    <button className="bg-primary text-white px-4 py-2 rounded text-sm font-bold hover:bg-primary-dark transition-colors">Buy it again</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
