// ============================================================
// src/admin/pages/AdminOrders.jsx
// Real-time order list with status tabs + notification beep
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiBell } from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import OrderCard   from '../components/OrderCard';
import {
  subscribeOrders,
  playNotificationBeep,
} from '../../lib/orderService';
import { subscribeSettings } from '../../lib/orderService';

const STATUS_TABS = [
  { value: 'pending',   label: 'New',       color: 'text-yellow-400' },
  { value: 'accepted',  label: 'Accepted',  color: 'text-blue-300'   },
  { value: 'preparing', label: 'Preparing', color: 'text-blue-400'   },
  { value: 'ready',     label: 'Ready',     color: 'text-green-400'  },
  { value: 'delivered', label: 'Delivered', color: 'text-gray-400'   },
  { value: 'cancelled', label: 'Cancelled', color: 'text-red-400'    },
  { value: 'all',       label: 'All',       color: 'text-brand-text' },
];

export default function AdminOrders() {
  const [orders,      setOrders]      = useState([]);
  const [settings,    setSettings]    = useState({ whatsapp: '919876543210' });
  const [searchParams, setSearchParams] = useSearchParams();
  const prevCountRef  = useRef(0);
  const [notifEnabled, setNotifEnabled] = useState(true);

  const activeStatus = searchParams.get('status') || 'pending';

  // Real-time orders
  useEffect(() => {
    const filter = activeStatus === 'all' ? null : activeStatus;
    const unsub  = subscribeOrders(incoming => {
      setOrders(incoming);
      // Notify on new pending orders
      const pendingCount = incoming.filter(o => o.status === 'pending').length;
      if (
        notifEnabled &&
        activeStatus === 'pending' &&
        pendingCount > prevCountRef.current &&
        prevCountRef.current !== 0
      ) {
        playNotificationBeep();
      }
      prevCountRef.current = pendingCount;
    }, filter);
    return unsub;
  }, [activeStatus, notifEnabled]);

  // Subscribe settings for WhatsApp number
  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return unsub;
  }, []);

  const newOrderCount = orders.filter(o => o.status === 'pending').length;

  return (
    <AdminLayout newOrderCount={newOrderCount}>
      <div className="px-4 py-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-black text-xl text-brand-text">
            Orders
          </h1>
          <button
            onClick={() => setNotifEnabled(p => !p)}
            className={`p-2.5 rounded-xl border transition-all ${
              notifEnabled
                ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                : 'border-brand-border text-brand-muted'
            }`}
            aria-label="Toggle notifications"
          >
            <FiBell size={18} />
          </button>
        </div>

        {/* Status tabs — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 mb-5">
          {STATUS_TABS.map(tab => {
            const count = tab.value === 'all'
              ? orders.length
              : orders.filter(o => o.status === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => setSearchParams({ status: tab.value })}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  activeStatus === tab.value
                    ? 'bg-brand-orange text-white shadow-orange'
                    : 'bg-brand-card border border-brand-border text-brand-muted'
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span className={`text-xs font-black ${activeStatus === tab.value ? 'text-white/80' : tab.color}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="text-6xl">📭</span>
            <p className="font-display font-bold text-brand-text text-xl">No orders here</p>
            <p className="text-brand-muted text-sm">
              {activeStatus === 'pending'
                ? 'Waiting for new orders...'
                : `No ${activeStatus} orders right now.`}
            </p>
            {activeStatus === 'pending' && (
              <div className="flex items-center gap-2">
                <span className="pulse-dot" />
                <span className="text-green-400 text-sm">Listening for new orders</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                whatsappNumber={settings.whatsapp}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
