import React from 'react';

const Messages = ({ setPage }) => {
    return (
        <div className="container py-8">
            <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Messages</h1>
                <div className="space-y-4">
                    {[1, 2, 3].map((msg) => (
                        <div key={msg} className="p-4 border border-[#DEE2E7] rounded-lg hover:border-primary cursor-pointer transition-colors flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#EFF2F4] flex-shrink-0"></div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold">Support Team</h3>
                                    <span className="text-xs text-[#8B96A5]">10:30 AM</span>
                                </div>
                                <p className="text-sm text-[#505050] line-clamp-1">Thank you for your inquiry regarding order #12345...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;
