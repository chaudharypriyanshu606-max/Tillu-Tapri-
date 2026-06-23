// ============================================================
// src/admin/pages/AdminLogin.jsx
// Firebase Auth login screen for admin
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      await login(email.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Invalid email or password.'
        : err.code === 'auth/too-many-requests'
        ? 'Too many attempts. Try later.'
        : 'Login failed. Check credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(255,107,0,0.08) 0%, #0D0D0D 60%)',
      }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="w-20 h-20 rounded-3xl bg-brand-card border border-brand-border flex items-center justify-center text-4xl shadow-orange">
          🌶️
        </div>
        <div className="text-center">
          <h1 className="font-display text-3xl font-black">
            <span className="text-brand-orange">Tillu</span>
            <span className="text-brand-text"> Tapri</span>
          </h1>
          <p className="text-brand-muted text-sm mt-1">Admin Login</p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input
              id="admin-email"
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              className="input-field pl-11 py-4 text-base"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
            <input
              id="admin-password"
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="input-field pl-11 pr-12 py-4 text-base"
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors"
            >
              {showPw ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            className="btn-primary py-4 text-base font-bold mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><div className="spinner w-5 h-5 border-2" /> Logging in...</>
            ) : (
              '🔐 Login'
            )}
          </button>
        </form>

        <p className="text-brand-muted text-xs text-center mt-8">
          © 2024 Tillu Tapri. Admin access only.
        </p>
      </div>
    </div>
  );
}
