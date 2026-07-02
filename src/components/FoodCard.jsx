// ============================================================
// src/components/FoodCard.jsx
// Reusable food card with image, details, add-to-cart controls
// ============================================================

import { useState } from 'react';
import { FiPlus, FiMinus, FiStar } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Toast from "./Toast";

export default function FoodCard({ item }) {
  const { addItem, removeItem, updateQty, isInCart, getItemQty } = useCart();
  const [imgError, setImgError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const qty = getItemQty(item.id);

  const handleAdd = () => addItem(item);
  const handleIncrease = () => updateQty(item.id, qty + 1);
  const handleDecrease = () => updateQty(item.id, qty - 1);

  const fallbackImg = `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop`;

  return (
  <>
    <Toast
      show={showToast}
      message={`${item.name} is currently unavailable.`}
      onClose={() => setShowToast(false)}
    />

    <div className="card group flex flex-col overflow-hidden">
      
      <div className="relative overflow-hidden h-44 md:h-48">
       <img
  src={item.imageUrl}
          alt={item.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.isBestSeller && (
            <span className="orange-badge text-[10px] flex items-center gap-1">
              <FaFire size={9} /> Best Seller
            </span>
          )}
          {item.isSpicy && (
            <span className="bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              🌶 Spicy
            </span>
          )}
        </div>
        {/* Veg / Non-veg dot */}
        <div className="absolute top-3 right-3">
          <div
            className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
              item.isVeg
                ? 'border-green-500 bg-brand-card'
                : 'border-red-500 bg-brand-card'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                item.isVeg ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
        {/* Discount ribbon */}
        {item.originalPrice && (
          <div className="absolute bottom-0 left-0 bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5">
            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-brand-text leading-tight text-sm md:text-base line-clamp-1">
            {item.name}
          </h3>
          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <FiStar className="text-yellow-400 fill-yellow-400" size={11} />
            <span className="text-brand-muted text-xs">{item.rating}</span>
          </div>
        </div>

        <p className="text-brand-muted text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Price + Cart control */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-brand-orange text-lg">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="price-original">₹{item.originalPrice}</span>
            )}
          </div>

          {!item.enabled ? (
  <button
    onClick={() => setShowToast(true)}
    className="bg-gray-600 text-white text-xs py-2 px-4 rounded-xl cursor-not-allowed"
  >
    Out of Stock
  </button>
  ) : qty === 0 ? (
  <button
    onClick={handleAdd}
      id={`add-to-cart-${item.id}`}
        className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
    < FiPlus size={13} /> Add
    </button>
    ) : (
            <div className="flex items-center gap-2 bg-brand-bg border border-brand-orange rounded-xl overflow-hidden">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span className="text-brand-text font-bold text-sm w-5 text-center">
                {qty}
              </span>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-200"
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
          )}
        </div>
          </div>
    </div>
  </>
);
}