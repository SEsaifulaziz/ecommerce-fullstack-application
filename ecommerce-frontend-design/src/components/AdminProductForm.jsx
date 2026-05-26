import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const AdminProductForm = () => {
  const { addProductAsAdmin } = useApp();
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    description: '',
    image: '',
    stock: '10',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await addProductAsAdmin({
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        image: form.image,
        stock: Number(form.stock),
      });
      setMessage('Product saved to database.');
      setForm({
        name: '',
        price: '',
        category: 'Electronics',
        description: '',
        image: '',
        stock: '10',
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-[#DEE2E7] rounded-lg p-6 mt-6">
      <h3 className="text-lg font-bold mb-4">Admin: Add product to database</h3>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border border-[#DEE2E7] rounded-md px-3 py-2 text-sm" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" required className="border border-[#DEE2E7] rounded-md px-3 py-2 text-sm" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="border border-[#DEE2E7] rounded-md px-3 py-2 text-sm" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" required className="border border-[#DEE2E7] rounded-md px-3 py-2 text-sm" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (https://...)" required className="border border-[#DEE2E7] rounded-md px-3 py-2 text-sm md:col-span-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required rows={3} className="border border-[#DEE2E7] rounded-md px-3 py-2 text-sm md:col-span-2" />
        <button type="submit" disabled={loading} className="md:col-span-2 bg-primary text-white py-2 rounded-lg font-medium disabled:opacity-60">
          {loading ? 'Saving...' : 'Create product'}
        </button>
      </form>
      {message && <p className="text-green-600 text-sm mt-3">{message}</p>}
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </div>
  );
};

export default AdminProductForm;
