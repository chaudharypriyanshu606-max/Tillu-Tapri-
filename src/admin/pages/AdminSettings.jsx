// ============================================================
// src/admin/pages/AdminSettings.jsx
// Shop settings: name, WhatsApp, min order, open/close toggle
// ============================================================

import { useState, useEffect } from 'react';
import { FiSave, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import { getSettings, saveSettings } from '../../lib/orderService';

export default function AdminSettings() {
  const [form,    setForm]    = useState({
    shopName: 'Tillu Tapri', whatsapp: '919876543210',
    deliveryRadius: '3 km', minOrder: 50, isOpen: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    getSettings().then(data => {
      setForm(prev => ({ ...prev, ...data }));
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings({ ...form, minOrder: Number(form.minOrder) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 py-5">
        <h1 className="font-display font-black text-xl text-brand-text mb-6">Settings</h1>

        <form onSubmit={handleSave} className="flex flex-col gap-5">

          {/* Shop open/close toggle */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-brand-text">Shop Status</p>
                <p className={`text-sm mt-0.5 font-semibold ${form.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                  {form.isOpen ? '🟢 Open — Accepting Orders' : '🔴 Closed — Not Taking Orders'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, isOpen: !f.isOpen }))}
                className={`w-16 h-8 rounded-full transition-colors duration-300 relative ${form.isOpen ? 'bg-green-500' : 'bg-brand-border'}`}
              >
                <div className={`w-7 h-7 bg-white rounded-full shadow absolute top-0.5 transition-all duration-300 ${form.isOpen ? 'left-8' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

          {/* Shop details */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="font-display font-bold text-brand-text">Shop Details</h2>

            <div>
              <label className="text-brand-muted text-xs mb-1.5 block">Shop Name</label>
              <input
                type="text"
                value={form.shopName}
                onChange={e => setForm(f => ({ ...f, shopName: e.target.value }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="text-brand-muted text-xs mb-1.5 block flex items-center gap-1">
                <FaWhatsapp className="text-green-400" /> WhatsApp Number (with country code)
              </label>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                placeholder="919876543210"
                className="input-field"
              />
              <p className="text-brand-muted text-xs mt-1">
                Format: 91XXXXXXXXXX (no + or spaces)
              </p>
            </div>
          </div>

          {/* Order settings */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="font-display font-bold text-brand-text">Order Settings</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Min Order (₹)</label>
                <input
                  type="number"
                  value={form.minOrder}
                  onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))}
                  className="input-field"
                  min="0"
                />
              </div>
              <div>
                <label className="text-brand-muted text-xs mb-1.5 block">Delivery Radius</label>
                <input
                  type="text"
                  value={form.deliveryRadius}
                  onChange={e => setForm(f => ({ ...f, deliveryRadius: e.target.value }))}
                  placeholder="e.g., 3 km"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={saving}
            className={`py-4 text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
              saved
                ? 'bg-green-500 text-white'
                : 'btn-primary'
            }`}
          >
            {saving ? (
              <><div className="spinner w-5 h-5 border-2" /> Saving...</>
            ) : saved ? (
              <><FiCheck size={18} /> Saved!</>
            ) : (
              <><FiSave size={18} /> Save Settings</>
            )}
          </button>
        </form>

        {/* App info */}
        <div className="mt-8 p-4 bg-brand-card border border-brand-border rounded-2xl text-center">
          <p className="text-brand-muted text-xs">Tillu Tapri Admin v1.0</p>
          <p className="text-brand-muted text-xs mt-0.5">Made with ❤️ for Tillu Bhaiya</p>
        </div>
      </div>
    </AdminLayout>
  );
}
