// ============================================================
// src/admin/components/AdminLayout.jsx
// Wrapper with sticky bottom nav for admin panel
// ============================================================

import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiList, FiMenu, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin/dashboard', icon: FiHome,     label: 'Dashboard' },
  { to: '/admin/orders',    icon: FiList,     label: 'Orders'    },
  { to: '/admin/menu',      icon: FiMenu,     label: 'Menu'      },
  { to: '/admin/settings',  icon: FiSettings, label: 'Settings'  },
];

export default function AdminLayout({ children, newOrderCount = 0 }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-brand-card border-b border-brand-border px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="text-2xl">🌶️</span>
          <span className="text-brand-orange">Tillu</span>
          <span className="text-brand-text"> Tapri</span>
          <span className="text-brand-muted text-xs font-normal ml-1">Admin</span>
        </div>
        {newOrderCount > 0 && (
          <div className="flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 rounded-full px-3 py-1">
            <span className="pulse-dot" />
            <span className="text-brand-orange text-sm font-bold">{newOrderCount} new</span>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Sticky bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-brand-card border-t border-brand-border safe-bottom">
        <div className="grid grid-cols-4 h-16">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors duration-200 relative ${
                  isActive
                    ? 'text-brand-orange'
                    : 'text-brand-muted hover:text-brand-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-orange rounded-full" />
                  )}
                  <n.icon size={20} />
                  <span>{n.label}</span>
                  {n.label === 'Orders' && newOrderCount > 0 && (
                    <span className="absolute top-1 right-4 w-4 h-4 bg-brand-orange text-white text-[9px] font-black rounded-full flex items-center justify-center">
                      {newOrderCount > 9 ? '9+' : newOrderCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
