import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const AuthPanel = () => {
  const { login, register, authError, authLoading } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (mode === 'login') {
      const ok = await login(form.username, form.password);
      if (ok) setSuccess('Logged in successfully.');
      return;
    }

    const ok = await register(form);
    if (ok) setSuccess('Account created and logged in.');
  };

  return (
    <div className="border border-[#DEE2E7] rounded-lg p-6">
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'login' ? 'bg-primary text-white' : 'bg-shade'}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'register' ? 'bg-primary text-white' : 'bg-shade'}`}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-[#505050] block mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {mode === 'register' && (
          <div>
            <label className="text-sm text-[#505050] block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        )}

        <div>
          <label className="text-sm text-[#505050] block mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {authError && <p className="text-red-600 text-sm">{authError}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={authLoading}
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {authLoading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>
    </div>
  );
};

export default AuthPanel;
