// ============================================================
// src/admin/pages/AdminDashboard.jsx
// Real-time stats: new orders, preparing, ready, delivered, revenue
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiShoppingBag, FiClock, FiCheckCircle, FiTruck,
  FiDollarSign, FiArrowRight, FiLogOut,
} from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import StatCard    from '../components/StatCard';
import { subscribeTodayOrders } from '../../lib/orderService';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const [orders,  setOrders]  = useState([]);
  const { logout, user }      = useAuth();
  const navigate              = useNavigate();

  useEffect(() => {
    const unsub = subscribeTodayOrders(setOrders);
    return unsub;
  }, []);

  // ── Derived stats ─────────────────────────────────────────
  const countBy = status => orders.filter(o => o.status === status).length;
  const newOrders      = countBy('pending');
  const preparing      = countBy('preparing') + countBy('accepted');
  const ready          = countBy('ready');
  const deliveredToday = countBy('delivered');
  const revenue        = orders
    .filter(o => o.status === 'delivered')
    .reduce((s, o) => s + (o.totalAmount || 0), 0);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <AdminLayout newOrderCount={newOrders}>
      <div className="px-4 py-6 space-y-6">

        {/* Welcome */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl font-black text-brand-text">
              Welcome, Tillu Bhaiya 👋
            </h2>
            <p className="text-brand-muted text-sm mt-1">
              Here's what's happening today.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-brand-card border border-brand-border text-brand-muted hover:text-red-400 hover:border-red-500/30 transition-all"
            aria-label="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={FiShoppingBag}
            label="New Orders"
            value={newOrders}
            color="text-yellow-400"
            bg="bg-yellow-500/10"
            onClick={() => navigate('/admin/orders?status=pending')}
          />
          <StatCard
            icon={FiClock}
            label="Preparing"
            value={preparing}
            color="text-blue-400"
            bg="bg-blue-500/10"
            onClick={() => navigate('/admin/orders?status=preparing')}
          />
          <StatCard
            icon={FiCheckCircle}
            label="Ready"
            value={ready}
            color="text-green-400"
            bg="bg-green-500/10"
            onClick={() => navigate('/admin/orders?status=ready')}
          />
          <StatCard
            icon={FiTruck}
            label="Delivered Today"
            value={deliveredToday}
            color="text-brand-muted"
            bg="bg-brand-border/50"
            onClick={() => navigate('/admin/orders?status=delivered')}
          />
        </div>

        {/* Revenue card */}
        <div className="bg-brand-card border border-brand-orange/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
            <FiDollarSign size={26} />
          </div>
          <div className="flex-1">
            <p className="text-brand-muted text-sm">Today's Revenue</p>
            <p className="font-display font-black text-4xl text-brand-orange mt-0.5">
              ₹{revenue.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* View all orders CTA */}
        <button
          onClick={() => navigate('/admin/orders')}
          className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
        >
          View All Orders <FiArrowRight size={18} />
        </button>

        {/* Recent orders preview */}
        {orders.filter(o => o.status === 'pending').length > 0 && (
          <div>
            <h3 className="font-display font-bold text-brand-text mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              Pending Orders ({newOrders})
            </h3>
            <div className="space-y-3">
              {orders.filter(o => o.status === 'pending').slice(0, 3).map(o => (
                <div
                  key={o.id}
                  onClick={() => navigate('/admin/orders')}
                  className="bg-brand-card border border-yellow-500/20 rounded-xl p-4 flex justify-between items-center active:scale-98 transition-transform cursor-pointer"
                >
                  <div>
                    <p className="font-bold text-brand-orange text-sm">#{o.orderId}</p>
                    <p className="text-brand-text text-sm">{o.customerName}</p>
                    <p className="text-brand-muted text-xs">{o.hostel}, Room {o.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-brand-orange text-lg">₹{o.totalAmount}</p>
                    <p className="text-brand-muted text-xs">{o.items?.length} items</p>
                    <FiArrowRight className="text-brand-muted ml-auto mt-1" size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
