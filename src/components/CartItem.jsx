// ============================================================
// src/components/CartItem.jsx
// Individual cart row with image, details, quantity controls
// ============================================================

import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-brand-card rounded-2xl border border-brand-border group">
      {/* Image */}
      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-brand-text text-sm md:text-base line-clamp-1">
          {item.name}
        </h4>
        <p className="text-brand-orange font-bold text-base mt-0.5">₹{item.price}</p>
        <p className="text-brand-muted text-xs mt-0.5">
          Subtotal: <span className="text-brand-text font-semibold">₹{item.price * item.quantity}</span>
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1 bg-brand-bg border border-brand-border rounded-xl overflow-hidden">
        <button
          onClick={() => updateQty(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-200"
          aria-label="Decrease"
        >
          <FiMinus size={14} />
        </button>
        <span className="w-7 text-center text-brand-text font-bold text-sm">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQty(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-200"
          aria-label="Increase"
        >
          <FiPlus size={14} />
        </button>
      </div>

      {/* Delete */}
      <button
        onClick={() => removeItem(item.id)}
        className="p-2 text-brand-muted hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100 md:opacity-100"
        aria-label={`Remove ${item.name}`}
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
}
