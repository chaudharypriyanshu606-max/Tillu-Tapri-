// ============================================================
// src/pages/Cart.jsx
// Shopping cart → checkout form → Firestore order placement
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart, FiTag, FiX, FiArrowRight, FiCheck,
  FiAlertCircle, FiUser, FiPhone, FiHome, FiHash, FiMessageSquare,
  FiChevronLeft,
} from 'react-icons/fi';
import CartItem  from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../lib/orderService';

// ── Step 1: Cart Review ───────────────────────────────────────
function CartReview({ onProceed }) {
  const {
    items, coupon, itemCount, subtotal, discountAmount,
    deliveryCharge, total, applyCoupon, removeCoupon, clearCart,
    FREE_DELIVERY_THRESHOLD,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg,   setCouponMsg]   = useState(null);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput.trim());
    setCouponMsg(result);
    if (result.success) setCouponInput('');
    setTimeout(() => setCouponMsg(null), 4000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 animate-fade-in pt-20">
        <span className="text-8xl">🛒</span>
        <h2 className="font-display text-3xl font-bold text-brand-text">Your cart is empty</h2>
        <p className="text-brand-muted text-center">Looks like you haven't added anything yet!</p>
        <Link to="/menu" id="cart-browse-btn" className="btn-primary flex items-center gap-2">
          Browse Menu <FiArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <div className="pt-24 pb-8 px-4 md:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-black text-brand-text flex items-center gap-3">
              <FiShoppingCart className="text-brand-orange" />
              Your Cart
            </h1>
            <p className="text-brand-muted mt-1">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1.5 transition-colors duration-200">
            <FiX size={16} /> Clear All
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="font-display font-bold text-brand-text text-lg mb-2">Items ({itemCount})</h2>
            {items.map(item => <CartItem key={item.id} item={item} />)}

            {/* Free delivery progress */}
            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <div className="p-4 bg-brand-card rounded-2xl border border-brand-border">
                <p className="text-brand-muted text-sm mb-2">
                  Add <span className="text-brand-orange font-semibold">₹{FREE_DELIVERY_THRESHOLD - subtotal}</span> more for FREE delivery!
                </p>
                <div className="w-full bg-brand-bg rounded-full h-2">
                  <div
                    className="h-2 bg-orange-gradient rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            <Link to="/menu" className="text-brand-orange hover:text-brand-orange-light text-sm font-semibold flex items-center gap-2 transition-colors">
              + Add More Items
            </Link>
          </div>

          {/* Bill + Coupon column */}
          <div className="flex flex-col gap-4">
            {/* Coupon */}
            <div className="bg-brand-card rounded-2xl border border-brand-border p-5">
              <h3 className="font-display font-bold text-brand-text mb-4 flex items-center gap-2">
                <FiTag className="text-brand-orange" /> Have a Coupon?
              </h3>
              {coupon ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-green-400 font-bold text-sm">{coupon.code}</p>
                    <p className="text-brand-muted text-xs">{coupon.label}</p>
                  </div>
                  <button onClick={removeCoupon} className="text-brand-muted hover:text-red-400 transition-colors">
                    <FiX size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                      className="input-field flex-1 text-sm py-2.5"
                    />
                    <button onClick={handleApplyCoupon} id="apply-coupon-btn" className="btn-primary text-sm py-2.5 px-4">
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <div className={`mt-2 flex items-center gap-2 text-sm ${couponMsg.success ? 'text-green-400' : 'text-red-400'}`}>
                      {couponMsg.success ? <FiCheck size={14} /> : <FiAlertCircle size={14} />}
                      {couponMsg.message}
                    </div>
                  )}
                  <p className="text-brand-muted text-xs mt-3">
                    Try: <span className="text-brand-orange cursor-pointer hover:underline" onClick={() => setCouponInput('TAPRI20')}>TAPRI20</span>,{' '}
                    <span className="text-brand-orange cursor-pointer hover:underline" onClick={() => setCouponInput('FLAT50')}>FLAT50</span>
                  </p>
                </>
              )}
            </div>

            {/* Bill */}
            <div className="bg-brand-card rounded-2xl border border-brand-border p-5">
              <h3 className="font-display font-bold text-brand-text mb-4">Bill Details</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Subtotal</span>
                  <span className="text-brand-text font-medium">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({coupon?.label})</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-brand-muted">Delivery</span>
                  <span className={deliveryCharge === 0 ? 'text-green-400' : 'text-brand-text font-medium'}>
                    {deliveryCharge === 0 ? 'Free 🎉' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t border-brand-border pt-3 flex justify-between">
                  <span className="font-display font-bold text-brand-text text-base">Total</span>
                  <span className="font-display font-bold text-brand-orange text-xl">₹{total}</span>
                </div>
              </div>

              <button
                id="proceed-checkout-btn"
                onClick={onProceed}
                className="btn-primary w-full mt-5 flex items-center justify-center gap-2 py-3.5"
              >
                Proceed to Checkout <FiArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Checkout Form ─────────────────────────────────────
function CheckoutForm({ onBack, onSuccess }) {
  const { items, total, discountAmount, deliveryCharge, coupon, clearCart } = useCart();

  const [form, setForm] = useState(() => {
  const profile = JSON.parse(localStorage.getItem("deliveryProfile") || "{}");
  const user = JSON.parse(localStorage.getItem("tilluUser") || "{}");

  return {
    customerName: user.name || "",
    phone: user.phone || "",
    city: profile.city || "",
    address: profile.address || "",
    deliveryNote: "",
  };
});
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
      e.phone = 'Enter a valid 10-digit number';
   if (!form.city.trim())
  errs.city = "City is required";

if (!form.address.trim())
  errs.address = "Delivery Address is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const result = await placeOrder({
        customerName:  form.customerName.trim(),
        phone:         form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        deliveryNote:  form.deliveryNote.trim(),
        paymentMethod,
        items:         items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        totalAmount:   total,
        subtotal:      total - deliveryCharge + discountAmount,
        discountAmount,
        deliveryCharge,
        couponCode:    coupon?.code || null,
      });
      clearCart();
      onSuccess(result.orderId);
    } catch (err) {
      console.error('Order failed:', err);
      setErrors({ submit: 'Failed to place order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const field = (id, placeholder, Icon, type = 'text') => (
    <div>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); setErrors(p => ({ ...p, [id]: undefined })); }}
          className={`input-field pl-11 ${errors[id] ? 'border-red-500' : ''}`}
        />
      </div>
      {errors[id] && <p className="text-red-400 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="pt-24 pb-8 px-4 md:px-8 border-b border-brand-border">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 rounded-xl bg-brand-card border border-brand-border text-brand-muted hover:text-brand-text transition-colors">
            <FiChevronLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-black text-brand-text">Delivery Details</h1>
            <p className="text-brand-muted mt-0.5 text-sm">Tell us where to deliver 🛵</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Order summary */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
            <h3 className="font-display font-bold text-brand-text mb-3">Order Summary</h3>
            <div className="space-y-2 mb-3">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-brand-muted">
                    <span className="text-brand-orange font-bold">{i.quantity}×</span> {i.name}
                  </span>
                  <span className="text-brand-text">₹{i.price * i.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-brand-border pt-3 flex justify-between">
              <span className="font-display font-bold text-brand-text">Total</span>
              <span className="font-display font-black text-brand-orange text-xl">₹{total}</span>
            </div>
          </div>

          {/* Delivery form */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="font-display font-bold text-brand-text">Your Details</h3>

            {field('customerName', 'Full Name *', FiUser)}
            {field('phone', 'Mobile Number * (10 digits)', FiPhone, 'tel')}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
                  <input
                    id="hostel"
                    type="text"
                    placeholder="City *"
                    value={form.city}
                    onChange={e => {
  setForm(f => ({ ...f, city: e.target.value }));
  setErrors(p => ({ ...p, city: undefined }));
}}
className={`input-field pl-11 ${errors.city ? 'border-red-500' : ''}`}
/>
                  
                </div>
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <div className="relative">
                  <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
                  <input
                    id="room"
                    type="text"
                    placeholder="Delivery Address *"
                    value={form.address}
                    onChange={e => { setForm(f => ({ ...f, address: e.target.value }));
                     setErrors(p => ({ ...p, address: undefined })); }}
                    className={`input-field pl-11 ${errors.address ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-4 text-brand-muted" size={16} />
              <textarea
                id="deliveryNote"
                rows={2}
                placeholder="Delivery instructions (optional)"
                value={form.deliveryNote}
                onChange={e => setForm(f => ({ ...f, deliveryNote: e.target.value }))}
                className="input-field pl-11 resize-none"
              />
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
              <FiAlertCircle size={16} /> {errors.submit}
            </div>
          )}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
  <h3 className="font-display font-bold text-brand-text mb-4">
    Payment Method
  </h3>

  <label className="flex items-center gap-4 cursor-pointer rounded-xl border border-brand-border p-4 hover:border-brand-orange transition">
    <input
      type="radio"
      name="payment"
      value="Cash on Delivery"
      checked={paymentMethod === "Cash on Delivery"}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="accent-orange-500"
    />

    <div>
      <p className="font-semibold text-brand-text">
        💵 Cash on Delivery
      </p>
      <p className="text-brand-muted text-sm">
        Pay after receiving your order.
      </p>
    </div>
  </label>
</div>
          <button
            id="place-order-btn"
            type="submit"
            disabled={loading}
            className="btn-primary py-4 text-base font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              <><div className="spinner w-5 h-5 border-2" /> Placing Order...</>
            ) : (
              <>🛵 Place Order — ₹{total}</>
            )}
          </button>

          <p className="text-brand-muted text-xs text-center">
            <p className="text-brand-muted text-xs text-center">
  Choose your preferred payment method.
</p>
          </p>
        </form>
      </div>
    </div>
  );
}

// ── Step 3: Order Success ─────────────────────────────────────
function OrderSuccess({ orderId }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center animate-fade-in">
      <div className="w-24 h-24 bg-green-500/15 rounded-full flex items-center justify-center animate-pulse-slow">
        <FiCheck className="text-green-400" size={44} />
      </div>
      <div>
        <h2 className="font-display text-3xl font-bold text-brand-text">Order Placed! 🎉</h2>
        <p className="text-brand-orange font-display font-black text-2xl mt-2">#{orderId}</p>
      </div>
      <p className="text-brand-muted max-w-sm">
        Your order has been received! We'll start preparing it right away.
        Estimated delivery: <strong className="text-brand-text">25–35 minutes</strong> 🛵
      </p>
      <div className="flex gap-3 mt-2">
        <Link to="/"     className="btn-outline">Back to Home</Link>
        <Link to="/menu" className="btn-primary">Order More</Link>
      </div>
    </div>
  );
}

// ── Main Cart page — multi-step ───────────────────────────────
export default function Cart() {
  const [step,    setStep]    = useState('cart');    // 'cart' | 'checkout' | 'success'
  const [orderId, setOrderId] = useState('');

  if (step === 'success') return <OrderSuccess orderId={orderId} />;
  if (step === 'checkout') return (
    <CheckoutForm
      onBack={() => setStep('cart')}
      onSuccess={id => { setOrderId(id); setStep('success'); }}
    />
  );
  return <CartReview onProceed={() => setStep('checkout')} />;
}
