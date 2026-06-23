// ============================================================
// src/admin/components/MenuItemCard.jsx
// Admin menu item card with enable/disable toggle + edit
// ============================================================

import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { updateMenuItem, deleteMenuItem } from '../../lib/orderService';

export default function MenuItemCard({ item, onEdit }) {
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    setToggling(true);
    try {
      await updateMenuItem(item.id, { enabled: !item.enabled });
    } catch (e) {
      console.error(e);
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteMenuItem(item.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`bg-brand-card border rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 ${item.enabled ? 'border-brand-border' : 'border-brand-border/40 opacity-60'}`}>
      {/* Image */}
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-brand-bg">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-display font-bold text-brand-text text-sm truncate">{item.name}</p>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${item.isVeg ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
            {item.isVeg ? 'VEG' : 'NON'}
          </span>
        </div>
        <p className="text-brand-orange font-bold text-base">₹{item.price}</p>
        <p className="text-brand-muted text-xs truncate">{item.category}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {/* Toggle */}
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${item.enabled ? 'bg-brand-orange' : 'bg-brand-border'}`}
          aria-label={item.enabled ? 'Disable item' : 'Enable item'}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all duration-300 ${item.enabled ? 'left-6' : 'left-0.5'}`} />
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 text-brand-muted hover:text-brand-orange transition-colors"
            aria-label="Edit item"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-brand-muted hover:text-red-400 transition-colors"
            aria-label="Delete item"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
