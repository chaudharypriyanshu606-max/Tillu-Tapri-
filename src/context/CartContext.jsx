// ============================================================
// src/context/CartContext.jsx
// Global cart state management with Context API
// ============================================================

import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

// ── Reducer ──────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === id ? { ...i, quantity } : i
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };

    case 'REMOVE_COUPON':
      return { ...state, coupon: null };

    default:
      return state;
  }
}

// ── Valid coupons ─────────────────────────────────────────────
const VALID_COUPONS = {
  TILLU10: { discount: 10, type: 'percent', label: '10% OFF' },
  TAPRI20: { discount: 20, type: 'percent', label: '20% OFF' },
  FLAT50:  { discount: 50, type: 'flat',    label: '₹50 OFF' },
  NEWUSER: { discount: 30, type: 'percent', label: '30% OFF for New Users' },
};

const DELIVERY_CHARGE = 20;
const FREE_DELIVERY_THRESHOLD = 199;

// ── Provider ──────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    coupon: null,
  });

  // Persist cart to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tillu-cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.items?.forEach(item =>
        dispatch({ type: 'ADD_ITEM', payload: item })
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tillu-cart', JSON.stringify(state));
  }, [state]);

  // ── Derived values ──────────────────────────────────────────
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  let discountAmount = 0;
  if (state.coupon) {
    const coupon = VALID_COUPONS[state.coupon.code];
    if (coupon) {
      discountAmount =
        coupon.type === 'percent'
          ? Math.round((subtotal * coupon.discount) / 100)
          : coupon.discount;
    }
  }

  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = Math.max(0, subtotal - discountAmount + deliveryCharge);

  // ── Actions ─────────────────────────────────────────────────
  const addItem     = (item)            => dispatch({ type: 'ADD_ITEM',        payload: item });
  const removeItem  = (id)              => dispatch({ type: 'REMOVE_ITEM',     payload: id });
  const updateQty   = (id, quantity)    => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart   = ()               => dispatch({ type: 'CLEAR_CART' });

  const applyCoupon = (code) => {
    const coupon = VALID_COUPONS[code.toUpperCase()];
    if (coupon) {
      dispatch({ type: 'APPLY_COUPON', payload: { code: code.toUpperCase(), ...coupon } });
      return { success: true, message: `${coupon.label} applied!` };
    }
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });

  const isInCart = (id) => state.items.some(i => i.id === id);
  const getItemQty = (id) => state.items.find(i => i.id === id)?.quantity || 0;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        coupon: state.coupon,
        itemCount,
        subtotal,
        discountAmount,
        deliveryCharge,
        total,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        applyCoupon,
        removeCoupon,
        isInCart,
        getItemQty,
        VALID_COUPONS,
        FREE_DELIVERY_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Custom hook ───────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
