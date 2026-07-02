// ============================================================
// src/admin/components/OrderCard.jsx
// Mobile-first order card with status action buttons
// ============================================================

import { useState } from 'react';
import { FiPhone, FiMapPin, FiClock, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import {
  updateOrderStatus,
  STATUS_FLOW,
  STATUS_COLORS,
  buildWhatsAppMessage,
} from '../../lib/orderService';

function formatTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function OrderCard({ order, whatsappNumber = '919876543210' }) {
  const [expanded, setExpanded]   = useState(false);
  const [loading,  setLoading]    = useState(false);

  const flow   = STATUS_FLOW[order.status];
  const colors = STATUS_COLORS[order.status] || STATUS_COLORS.pending;

  const handleAction = async () => {
    if (!flow?.next) return;
    setLoading(true);
    try {
      await updateOrderStatus(order.id, flow.next);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm(`Cancel order ${order.orderId}?`)) return;
    setLoading(true);
    try {
      await updateOrderStatus(order.id, 'cancelled');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
      {/* Header row */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-brand-orange text-lg">
              #{order.orderId}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors}`}>
              {order.status}
            </span>
          </div>
          <p className="font-bold text-brand-text mt-1">{order.customerName}</p>
          <a
            href={`tel:${order.phone}`}
            className="flex items-center gap-1.5 text-brand-muted text-sm mt-0.5 hover:text-brand-orange transition-colors"
          >
            <FiPhone size={12} /> {order.phone}
          </a>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <span className="text-brand-muted text-xs flex items-center gap-1">
            <FiClock size={11} /> {formatTime(order.createdAt)}
          </span>
          <span className="font-display font-black text-brand-orange text-xl">
            ₹{order.totalAmount}
          </span>
        </div>
      </div>

      {/* Delivery info */}
      <div className="px-4 pb-3 space-y-2">

  {/* Payment */}
  <div className="flex items-center gap-2">
    <span className="text-xs font-semibold text-brand-muted">
      Payment:
    </span>

    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
      order.paymentMethod === "Cash on Delivery"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-green-500/20 text-green-400"
    }`}>
      {order.paymentMethod === "Cash on Delivery"
        ? "💵 Cash on Delivery"
        : "📱 UPI"}
    </span>
  </div>

  {/* Delivery */}
  <div className="flex items-start gap-1.5">
    <FiMapPin
      className="text-brand-orange mt-0.5 flex-shrink-0"
      size={13}
    />

    <p className="text-brand-muted text-sm">
      {order.hostel}, Room {order.room}

      {order.deliveryNote && (
        <span className="block text-brand-muted/70 text-xs mt-0.5 italic">
          "{order.deliveryNote}"
        </span>
      )}
    </p>
  

</div>
        <FiMapPin className="text-brand-orange mt-0.5 flex-shrink-0" size={13} />
        <p className="text-brand-muted text-sm">
          {order.hostel}, Room {order.room}
          {order.deliveryNote && (
            <span className="block text-brand-muted/70 text-xs mt-0.5 italic">
              "{order.deliveryNote}"
            </span>
          )}
        </p>
      </div>

      {/* Items summary */}
      <div className="px-4 pb-3">
        <div className="bg-brand-bg rounded-xl p-3 space-y-1">
          {order.items?.slice(0, expanded ? undefined : 3).map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-brand-text">
                <span className="text-brand-orange font-bold">{item.quantity}×</span> {item.name}
              </span>
              <span className="text-brand-muted">₹{item.price * item.quantity}</span>
            </div>
          ))}
          {!expanded && order.items?.length > 3 && (
            <button
              onClick={() => setExpanded(true)}
              className="text-brand-orange text-xs flex items-center gap-1 mt-1"
            >
              <FiChevronDown size={12} /> +{order.items.length - 3} more items
            </button>
          )}
          {expanded && order.items?.length > 3 && (
            <button
              onClick={() => setExpanded(false)}
              className="text-brand-orange text-xs flex items-center gap-1 mt-1"
            >
              <FiChevronUp size={12} /> Show less
            </button>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="px-4 pb-4 flex flex-col gap-2">
          {/* Primary action */}
          {flow?.next && (
            <button
              onClick={handleAction}
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white text-base transition-all duration-200 active:scale-95 ${flow.color} ${loading ? 'opacity-60' : ''}`}
            >
              {loading ? 'Updating...' : flow.label}
            </button>
          )}

          {/* Secondary row: cancel + whatsapp */}
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-red-500/30 text-red-400 font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <FiX size={15} /> Cancel
            </button>
            <a
              href={buildWhatsAppMessage(order, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <FaWhatsapp size={16} /> WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Final state badges */}
      {(order.status === 'delivered' || order.status === 'cancelled') && (
        <div className="px-4 pb-4">
          <div className={`w-full py-3 rounded-xl text-center font-bold text-sm border ${colors}`}>
            {order.status === 'delivered' ? '✓ Delivered' : '✗ Cancelled'}
          </div>
        </div>
      )}
    </div>
  );
}
