import React from 'react';

const Profile = ({ setPage }) => {
    return (
        <div className="container py-8">
            <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#DEE2E7]">
                    <div className="w-24 h-24 rounded-full bg-[#E3F0FF] flex items-center justify-center text-primary text-3xl font-bold">JD</div>
                    <div>
                        <h2 className="text-xl font-bold">Hafiza Sadia</h2>
                        <p className="text-[#505050]">hafizasadia@gmail.com</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <button className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg hover:bg-shade transition-colors flex justify-between items-center">
                        <span>Edit Profile</span>
                        <span className="text-[#8B96A5]">→</span>
                    </button>
                    <button className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg hover:bg-shade transition-colors flex justify-between items-center">
                        <span>Shipping Address</span>
                        <span className="text-[#8B96A5]">→</span>
                    </button>
                    <button className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg hover:bg-shade transition-colors flex justify-between items-center">
                        <span>Payment Methods</span>
                        <span className="text-[#8B96A5]">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
