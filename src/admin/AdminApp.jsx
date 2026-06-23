// ============================================================
// src/admin/AdminApp.jsx
// Admin sub-router with Firebase Auth guard
// ============================================================

import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLogin     from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders    from './pages/AdminOrders';
import AdminMenu      from './pages/AdminMenu';
import AdminSettings  from './pages/AdminSettings';

// ── Auth Guard ────────────────────────────────────────────────
function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl">🌶️</span>
          <div className="spinner" />
          <p className="text-brand-muted text-sm">Loading admin...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

// ── Admin routes ──────────────────────────────────────────────
function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="dashboard"
        element={<RequireAuth><AdminDashboard /></RequireAuth>}
      />
      <Route
        path="orders"
        element={<RequireAuth><AdminOrders /></RequireAuth>}
      />
      <Route
        path="menu"
        element={<RequireAuth><AdminMenu /></RequireAuth>}
      />
      <Route
        path="settings"
        element={<RequireAuth><AdminSettings /></RequireAuth>}
      />
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

// ── AdminApp wraps everything in AuthProvider ─────────────────
export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  );
}
