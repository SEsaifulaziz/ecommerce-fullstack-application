import React from 'react';
import { useApp } from '../context/AppContext';
import AuthPanel from './AuthPanel';
import AdminProductForm from './AdminProductForm';

const Profile = () => {
  const { user, logout, isAdmin } = useApp();

  if (!user) {
    return (
      <div className="container py-8">
        <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
          <p className="text-[#505050] mb-6 text-sm">Connect to your Render backend for login and registration.</p>
          <AuthPanel />
        </div>
      </div>
    );
  }

  const initials = user.username?.slice(0, 2).toUpperCase() || 'U';

  return (
    <div className="container py-8">
      <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#DEE2E7]">
          <div className="w-24 h-24 rounded-full bg-[#E3F0FF] flex items-center justify-center text-primary text-3xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-[#505050]">{user.email}</p>
            <p className="text-[#8B96A5] text-sm mt-1">{user.roles?.join(', ')}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="w-full mb-4 bg-white border border-[#DEE2E7] text-primary py-2 rounded-lg font-medium hover:bg-shade transition-colors"
        >
          Log out
        </button>

        <div className="space-y-4">
          <div className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg text-[#8B96A5]">
            Edit Profile (coming soon)
          </div>
          <div className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg text-[#8B96A5]">
            Shipping Address (coming soon)
          </div>
          <div className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg text-[#8B96A5]">
            Payment Methods (coming soon)
          </div>
        </div>

        {isAdmin && <AdminProductForm />}
      </div>
    </div>
  );
};

export default Profile;
