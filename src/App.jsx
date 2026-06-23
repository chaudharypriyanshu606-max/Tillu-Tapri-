// ============================================================
// src/App.jsx
// Root component: customer routes + /admin/* mounted separately
// ============================================================

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import Menu     from './pages/Menu';
import Cart     from './pages/Cart';
import Contact  from './pages/Contact';
import About    from './pages/About';
import Profile  from './pages/Profile';
import AdminApp from './admin/AdminApp';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Customer layout wrapper (Navbar + Footer)
function CustomerLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// 404 page
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="text-8xl">🍕</span>
      <h1 className="font-display text-5xl font-black text-brand-orange">404</h1>
      <h2 className="font-display text-2xl font-bold text-brand-text">Page Not Found</h2>
      <p className="text-brand-muted">Looks like this page got eaten! 😄</p>
      <a href="/" className="btn-primary">Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ── Admin routes — no customer layout ── */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* ── Customer routes — with Navbar + Footer ── */}
          <Route
            path="/"
            element={
              <CustomerLayout>
                <Home />
              </CustomerLayout>
            }
          />
          <Route
            path="/menu"
            element={
              <CustomerLayout>
                <Menu />
              </CustomerLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <CustomerLayout>
                <Cart />
              </CustomerLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <CustomerLayout>
                <Contact />
              </CustomerLayout>
            }
          />
          <Route
            path="/about"
            element={
              <CustomerLayout>
                <About />
              </CustomerLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <CustomerLayout>
                <Profile />
              </CustomerLayout>
            }
          />
          <Route
            path="*"
            element={
              <CustomerLayout>
                <NotFound />
              </CustomerLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
