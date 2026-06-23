// ============================================================
// src/admin/pages/AdminMenu.jsx
// Menu management: list items, add/edit via bottom sheet modal
// ============================================================

import { useState, useEffect } from 'react';
import { FiPlus, FiX, FiCheck } from 'react-icons/fi';
import AdminLayout  from '../components/AdminLayout';
import MenuItemCard from '../components/MenuItemCard';
import {
  subscribeMenu,
  addMenuItem,
  updateMenuItem,
} from '../../lib/orderService';
import { categories } from '../../data/menuData';

const BLANK = {
  name: '', description: '', price: '', category: 'snacks',
  isVeg: true, imageUrl: '', enabled: true,
};

export default function AdminMenu() {
  const [items,      setItems]     = useState([]);
  const [modal,      setModal]     = useState(false);
  const [form,       setForm]      = useState(BLANK);
  const [editId,     setEditId]    = useState(null);
  const [saving,     setSaving]    = useState(false);
  const [filterCat,  setFilterCat] = useState('all');
  const [search,     setSearch]    = useState('');

  // Real-time menu
  useEffect(() => {
    const unsub = subscribeMenu(setItems);
    return unsub;
  }, []);

  const openAdd = () => {
    setForm(BLANK);
    setEditId(null);
    setModal(true);
  };

  const openEdit = (item) => {
    setForm({
      name:        item.name        || '',
      description: item.description || '',
      price:       item.price       || '',
      category:    item.category    || 'snacks',
      isVeg:       item.isVeg       ?? true,
      imageUrl:    item.imageUrl    || '',
      enabled:     item.enabled     ?? true,
    });
    setEditId(item.id);
    setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      const data = { ...form, price: Number(form.price) };
      if (editId) {
        await updateMenuItem(editId, data);
      } else {
        await addMenuItem(data);
      }
      setModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Filter displayed items
  const displayed = items.filter(i => {
    const matchCat    = filterCat === 'all' || i.category === filterCat;
    const matchSearch = i.name?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AdminLayout>
      <div className="px-4 py-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-black text-xl text-brand-text">
            Menu Management
          </h1>
          <button
            id="add-menu-item-btn"
            onClick={openAdd}
            className="btn-primary flex items-center gap-2 py-2.5 px-4 text-sm"
          >
            <FiPlus size={16} /> Add Item
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field mb-4 text-sm"
        />

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 mb-5">
          <button
            onClick={() => setFilterCat('all')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-all ${
              filterCat === 'all' ? 'bg-brand-orange text-white' : 'bg-brand-card border border-brand-border text-brand-muted'
            }`}
          >
            All ({items.length})
          </button>
          {categories.slice(1).map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-all ${
                filterCat === cat.id ? 'bg-brand-orange text-white' : 'bg-brand-card border border-brand-border text-brand-muted'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Item list */}
        {displayed.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-brand-text font-bold">No items found</p>
            <button onClick={openAdd} className="btn-primary mt-4">Add First Item</button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map(item => (
              <MenuItemCard key={item.id} item={item} onEdit={openEdit} />
            ))}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal (bottom sheet) ──────────────────── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModal(false)}
          />

          {/* Sheet */}
          <div className="relative bg-brand-card border-t border-brand-border rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-brand-text text-xl">
                {editId ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => setModal(false)}
                className="p-2 rounded-xl bg-brand-bg text-brand-muted hover:text-brand-text transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Item Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Masala Chai"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Description</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-brand-muted text-xs mb-1.5 block">Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g., 49"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    className="input-field"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="text-brand-muted text-xs mb-1.5 block">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="input-field"
                  >
                    {categories.slice(1).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Image URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  className="input-field"
                />
              </div>

              {/* Veg / Non-veg toggle */}
              <div className="flex items-center justify-between p-4 bg-brand-bg rounded-xl">
                <div>
                  <p className="text-brand-text font-semibold text-sm">Veg Item</p>
                  <p className="text-brand-muted text-xs">Toggle for veg / non-veg</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, isVeg: !f.isVeg }))}
                  className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${form.isVeg ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all duration-300 ${form.isVeg ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="btn-primary py-4 text-base font-bold flex items-center justify-center gap-2 mt-2"
              >
                {saving ? (
                  <><div className="spinner w-5 h-5 border-2" /> Saving...</>
                ) : (
                  <><FiCheck size={18} /> {editId ? 'Save Changes' : 'Add Item'}</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
