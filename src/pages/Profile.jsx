// ============================================================
// src/pages/Profile.jsx
// User profile: order history, saved addresses, payment, settings
// ============================================================


import { useState, useEffect } from 'react';
import {
  FiUser, FiPackage, FiMapPin, FiCreditCard, FiSettings,
  FiLogOut, FiEdit2, FiPhone, FiMail, FiChevronRight,
  FiCheck, FiPlus,
} from 'react-icons/fi';
import { orderHistory } from '../data/menuData';
import { subscribeOrders } from '../lib/orderService';

const TABS = [
  { id: 'orders',   label: 'Order History',    icon: FiPackage    },
  { id: 'address',  label: 'Saved Addresses',  icon: FiMapPin     },
  { id: 'payment',  label: 'Payment Methods',  icon: FiCreditCard },
  { id: 'settings', label: 'Settings',         icon: FiSettings   },
];

const savedAddresses = [
  { id: 1, label: 'Home',   address: '12, Kidwai Nagar, Kanpur – 208011', isDefault: true  },
  { id: 2, label: 'Office', address: 'Civil Lines, Kanpur – 208001',       isDefault: false },
];

const paymentMethods = [
  { id: 1, type: 'UPI',         detail: 'rahul@paytm',    isDefault: true  },
  { id: 2, type: 'Credit Card', detail: '**** **** 4321', isDefault: false },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
  name: '',
  email: '',
  phone: '',
});

useEffect(() => {
  const unsubscribe = subscribeOrders((data) => {
  console.log("FIREBASE ORDERS", data);
  setOrders(data);
});
  return unsubscribe;
}, []);
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem('tilluUser');

  if (savedUser) {
    return JSON.parse(savedUser);
  }

  return {
    name: 'Rahul Yadav',
    email: 'rahulyadav@gmail.com',
    phone: '+91 98765-43210',
    avatar: 'RY',
    joined: 'Member since May 2024',
  };
});

useEffect(() => {
  localStorage.setItem('tilluUser', JSON.stringify(user));
}, [user]);

  return (
    <div className="min-h-screen animate-fade-in">
  {isEditing && (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-brand-card p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">
          Edit Profile
        </h2>

        <input
  type="text"
  value={editForm.name}
  onChange={(e) =>
    setEditForm({
      ...editForm,
      name: e.target.value,
    })
  }
  className="w-full p-3 mb-3 rounded bg-black text-white border border-gray-600"
/>

       <input
  type="email"
  value={editForm.email}
  onChange={(e) =>
    setEditForm({
      ...editForm,
      email: e.target.value,
    })
  }
  className="w-full p-3 mb-3 rounded bg-black text-white border border-gray-600"
/>

       <input
  type="text"
  value={editForm.phone}
  onChange={(e) =>
    setEditForm({
      ...editForm,
      phone: e.target.value,
    })
  }
  className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-600"
/>

        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-red-500 rounded"
          >
            Cancel
          </button>

          <button
           
  onClick={() => {
    console.log("EDIT FORM =", editForm);
  const updatedUser = {
    ...user,
    name: editForm.name,
    email: editForm.email,
    phone: editForm.phone,
  };

  setUser(updatedUser);

  localStorage.setItem(
    'tilluUser',
    JSON.stringify(updatedUser)
  );

  setIsEditing(false);
}}
  className="px-4 py-2 bg-green-500 rounded"
>
  Save
</button>
        </div>
      </div>
    </div>
  )}

  {/* Header */}
      <div className="pt-20 pb-0 bg-brand-card border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-orange-gradient flex items-center justify-center text-white font-display font-black text-2xl shadow-orange">
                {user.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-brand-card flex items-center justify-center">
                <FiCheck size={10} className="text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display text-2xl font-black text-brand-text">{user.name}</h1>
              <div className="flex flex-wrap gap-4 mt-1">
                <span className="text-brand-muted text-sm flex items-center gap-1.5">
                  <FiMail size={12} /> {user.email}
                </span>
                <span className="text-brand-muted text-sm flex items-center gap-1.5">
                  <FiPhone size={12} /> {user.phone}
                </span>
              </div>
              <p className="text-brand-orange text-xs mt-1 font-medium">{user.joined}</p>
            </div>

           <button onClick={() => {
  console.log("EDIT CLICKED");

  setEditForm({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  setIsEditing(true);
}}
  className="btn-outline flex items-center gap-2 text-sm py-2.5 px-5">
  <FiEdit2 size={14} /> Edit Profile
</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-8 overflow-x-auto hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.id}
                id={`profile-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-bg text-brand-orange border-t border-l border-r border-brand-border -mb-px z-10'
                    : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* ── Sidebar Nav (desktop) ─────────────────────── */}
          <aside className="hidden md:flex flex-col gap-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-brand-orange/15 text-brand-orange'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-card'
                }`}
              >
                <span className="flex items-center gap-3">
                  <tab.icon size={16} />
                  {tab.label}
                </span>
                <FiChevronRight size={14} />
              </button>
            ))}

            <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-4">
              <FiLogOut size={16} />
              Logout
            </button>
          </aside>

          {/* ── Main Content ──────────────────────────────── */}
          <div className="md:col-span-3">

            {/* Order History */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-brand-text text-xl">Order History</h2>
                  <button className="text-brand-orange text-sm font-semibold hover:text-brand-orange-light transition-colors">
                    View All
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {orders.map(order => (
                    <div key={order.id} className="card p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-display font-bold text-brand-text">{order.orderId}</p>
                          <p className="text-brand-muted text-xs mt-0.5">{order.createdAt?.toDate? order.createdAt.toDate().toLocaleDateString(): 'Just now'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-brand-orange text-lg">₹{order.totalAmount}</p>
                          <span className="bg-green-500/15 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-brand-border pt-3">
                        <p className="text-brand-muted text-xs">
                          {order.items?.map(item =>  `${item.quantity}x ${item.name}`).join(' • ')}
                        </p>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <button className="text-brand-orange text-xs font-semibold hover:text-brand-orange-light transition-colors">
                          Reorder
                        </button>
                        <button className="text-brand-muted text-xs hover:text-brand-text transition-colors">
                          View Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Addresses */}
            {activeTab === 'address' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-brand-text text-xl">Saved Addresses</h2>
                  <button className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
                    <FiPlus size={14} /> Add New
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {savedAddresses.map(addr => (
                    <div key={addr.id} className="card p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                        <FiMapPin size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-display font-bold text-brand-text">{addr.label}</p>
                          {addr.isDefault && (
                            <span className="orange-badge text-[10px]">Default</span>
                          )}
                        </div>
                        <p className="text-brand-muted text-sm mt-1">{addr.address}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-brand-muted hover:text-brand-orange transition-colors p-1">
                          <FiEdit2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-brand-text text-xl">Payment Methods</h2>
                  <button className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4">
                    <FiPlus size={14} /> Add New
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {paymentMethods.map(pm => (
                    <div key={pm.id} className="card p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                        <FiCreditCard size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-display font-bold text-brand-text">{pm.type}</p>
                          {pm.isDefault && (
                            <span className="orange-badge text-[10px]">Default</span>
                          )}
                        </div>
                        <p className="text-brand-muted text-sm">{pm.detail}</p>
                      </div>
                      <button className="text-brand-muted hover:text-red-400 transition-colors p-1 text-xs">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="font-display font-bold text-brand-text text-xl mb-6">Settings</h2>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Email Notifications', desc: 'Order updates and promotions', enabled: true  },
                    { label: 'SMS Alerts',           desc: 'Delivery status via SMS',     enabled: true  },
                    { label: 'Push Notifications',  desc: 'App notifications',            enabled: false },
                    { label: 'Marketing Emails',    desc: 'Deals and offers',             enabled: false },
                  ].map(setting => (
                    <div
                      key={setting.label}
                      className="card p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold text-brand-text text-sm">{setting.label}</p>
                        <p className="text-brand-muted text-xs mt-0.5">{setting.desc}</p>
                      </div>
                      {/* Toggle */}
                      <div
                        className={`w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer relative flex-shrink-0 ${
                          setting.enabled ? 'bg-brand-orange' : 'bg-brand-border'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all duration-300 ${
                            setting.enabled ? 'left-6' : 'left-0.5'
                          }`}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 p-5 bg-red-500/5 border border-red-500/20 rounded-2xl">
                    <h3 className="font-display font-bold text-red-400 mb-1">Danger Zone</h3>
                    <p className="text-brand-muted text-xs mb-3">These actions are irreversible.</p>
                    <button className="text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-500/10 transition-colors duration-200">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
