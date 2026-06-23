// ============================================================
// src/components/Navbar.jsx
// Sticky navbar with mobile hamburger menu & cart badge
// ============================================================

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart, FiMenu, FiX, FiUser, FiBell,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const navLinks = [
  { to: '/',        label: 'Home'     },
  { to: '/menu',    label: 'Menu'     },
  { to: '/about',   label: 'About Us' },
  { to: '/contact', label: 'Contact'  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const { itemCount }             = useCart();
  const navigate                  = useNavigate();

  // Shadow nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-bg/95 backdrop-blur-md shadow-lg border-b border-brand-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-bold"
          onClick={handleNavClick}
        >
          <span className="text-2xl">🌶️</span>
          <span>
            <span className="text-brand-orange">Tillu</span>
            <span className="text-brand-text"> Tapri</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `nav-link text-sm font-medium ${
                    isActive ? 'text-brand-orange after:w-full' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            id="nav-cart-btn"
            onClick={() => navigate('/cart')}
            className="relative p-2 text-brand-muted hover:text-brand-orange transition-colors duration-200"
            aria-label="Cart"
          >
            <FiShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-slow">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <button
            id="nav-profile-btn"
            onClick={() => navigate('/profile')}
            className="p-2 text-brand-muted hover:text-brand-orange transition-colors duration-200"
            aria-label="Profile"
          >
            <FiUser size={22} />
          </button>

          {/* Order CTA */}
          <Link
            to="/menu"
            id="nav-order-btn"
            className="hidden md:block btn-primary text-sm py-2 px-4"
          >
            Order Now
          </Link>

          {/* Hamburger */}
          <button
            id="nav-menu-toggle"
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-brand-muted hover:text-brand-orange transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-card/95 backdrop-blur-md border-b border-brand-border px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-brand-orange/15 text-brand-orange'
                        : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/menu"
                onClick={handleNavClick}
                className="btn-primary block text-center text-sm py-3"
              >
                🛵 Order Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
