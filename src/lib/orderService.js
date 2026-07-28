// ============================================================
// src/lib/orderService.js
// All Firestore operations for orders, menu, settings
// ============================================================

import {
  collection, doc, addDoc, updateDoc, onSnapshot,
  query, orderBy, where, serverTimestamp, getDoc, setDoc,
  getDocs, deleteDoc, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from "firebase/auth";

// ── Collections ──────────────────────────────────────────────
const ordersCol   = () => collection(db, 'orders');
const menuCol     = () => collection(db, 'menu');
const settingsDoc = () => doc(db, 'settings', 'shop');

// ── Order ID generator ────────────────────────────────────────
// Generates TT + 4-digit number, e.g. TT1024
export function subscribeUserOrders(callback) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    callback([]);
    return () => {};
  }

  const q = query(
    ordersCol(),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(orders);
  });
}
export function generateOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `TT${n}`;
}

// ── Place Order (Customer) ────────────────────────────────────
export async function placeOrder(orderData) {
  const auth = getAuth();
  const user = auth.currentUser;

  const orderId = generateOrderId();

  const docRef = await addDoc(ordersCol(), {
    orderId,

    ...orderData,

    uid: user?.uid || null,
    email: user?.email || null,

    status: "pending",
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    orderId,
  };
}

// ── Real-time orders listener ─────────────────────────────────
// Returns unsubscribe function. Calls callback with array of orders.
export function subscribeOrders(callback, statusFilter = null) {
  let q = query(ordersCol(), orderBy('createdAt', 'desc'));
  if (statusFilter) {
    q = query(ordersCol(), where('status', '==', statusFilter), orderBy('createdAt', 'desc'));
  }
  return onSnapshot(q, snapshot => {
    const orders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(orders);
  });
}

// ── Subscribe today's orders ──────────────────────────────────
export function subscribeTodayOrders(callback) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const q = query(
    ordersCol(),
    where('createdAt', '>=', Timestamp.fromDate(startOfDay)),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, snapshot => {
    const orders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(orders);
  });
}

// ── Update order status ───────────────────────────────────────
export async function updateOrderStatus(docId, status) {
  const ref = doc(db, 'orders', docId);
  await updateDoc(ref, {
    status,
    [`${status}At`]: serverTimestamp(),
  });
}

// ── Menu CRUD ─────────────────────────────────────────────────
export function subscribeMenu(callback) {
  return onSnapshot(menuCol(), snapshot => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(items);
  });
}

export async function addMenuItem(item) {
  return addDoc(menuCol(), { ...item, enabled: true, createdAt: serverTimestamp() });
}

export async function updateMenuItem(id, data) {
  return updateDoc(doc(db, 'menu', id), data);
}

export async function deleteMenuItem(id) {
  return deleteDoc(doc(db, 'menu', id));
}

// ── Settings ──────────────────────────────────────────────────
export async function getSettings() {
  const snap = await getDoc(settingsDoc());
  return snap.exists() ? snap.data() : getDefaultSettings();
}

export async function saveSettings(data) {
  return setDoc(settingsDoc(), data, { merge: true });
}

export function subscribeSettings(callback) {
  return onSnapshot(settingsDoc(), snap => {
    callback(snap.exists() ? snap.data() : getDefaultSettings());
  });
}

function getDefaultSettings() {
  return {
    shopName:       'Tillu Tapri',
    whatsapp:       '919876543210',
    deliveryRadius: '3 km',
    minOrder:       50,
    isOpen:         true,
  };
}

// ── Status helpers ────────────────────────────────────────────
export const STATUS_FLOW = {
  pending:   { next: 'accepted',  label: 'Accept Order',  color: 'bg-green-500'  },
  accepted:  { next: 'preparing', label: 'Start Preparing', color: 'bg-blue-500' },
  preparing: { next: 'ready',     label: 'Mark Ready',    color: 'bg-brand-orange' },
  ready:     { next: 'delivered', label: 'Mark Delivered', color: 'bg-green-600' },
  delivered: { next: null,        label: 'Delivered ✓',   color: 'bg-gray-600'   },
  cancelled: { next: null,        label: 'Cancelled',     color: 'bg-red-800'    },
};

export const STATUS_COLORS = {
  pending:   'text-yellow-400  bg-yellow-400/15  border-yellow-400/30',
  accepted:  'text-blue-400    bg-blue-400/15    border-blue-400/30',
  preparing: 'text-orange-400  bg-orange-400/15  border-orange-400/30',
  ready:     'text-green-400   bg-green-400/15   border-green-400/30',
  delivered: 'text-gray-400    bg-gray-400/15    border-gray-400/30',
  cancelled: 'text-red-400     bg-red-400/15     border-red-400/30',
};

// ── WhatsApp message builder ──────────────────────────────────
export function buildWhatsAppMessage(order, whatsappNumber) {
  const items = order.items?.map(i => `• ${i.quantity}x ${i.name}`).join('\n') || '';
  const msg = encodeURIComponent(
    `🌶️ *Tillu Tapri*\n\nHi ${order.customerName}! Your order *${order.orderId}* is confirmed.\n\n${items}\n\n*Total: ₹${order.totalAmount}*\n\nDelivering to: ${order.city}, ${order.address}  🛵`
  );
  return `https://wa.me/${whatsappNumber}?text=${msg}`;
}

// ── Notification beep (Web Audio API — no file needed) ────────
export function playNotificationBeep() {
  try {
    const ctx    = new (window.AudioContext || window.webkitAudioContext)();
    const osc    = ctx.createOscillator();
    const gain   = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
    // Second beep
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      osc2.connect(gain);
      osc2.frequency.setValueAtTime(1100, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.4);
    }, 300);
  } catch (e) {
    console.warn('Audio notification failed:', e);
  }
}
