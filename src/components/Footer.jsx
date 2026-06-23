// ============================================================
// src/components/Footer.jsx
// Full footer with links, contact, hours, social media
// ============================================================

import { Link } from 'react-router-dom';
import {
  FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp,
} from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const quickLinks = [
  { to: '/',        label: 'Home'     },
  { to: '/menu',    label: 'Menu'     },
  { to: '/about',   label: 'About Us' },
  { to: '/contact', label: 'Contact'  },
  { to: '/cart',    label: 'Cart'     },
];

const socialLinks = [
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-400'    },
  { href: 'https://facebook.com',  icon: FaFacebookF, label: 'Facebook',  color: 'hover:text-blue-400'    },
  { href: 'https://twitter.com',   icon: FaTwitter,   label: 'Twitter',   color: 'hover:text-sky-400'     },
  { href: 'https://youtube.com',   icon: FaYoutube,   label: 'YouTube',   color: 'hover:text-red-400'     },
  { href: 'https://wa.me/919876543210', icon: FaWhatsapp, label: 'WhatsApp', color: 'hover:text-green-400' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-card border-t border-brand-border mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold mb-4">
              <span className="text-2xl">🌶️</span>
              <span>
                <span className="text-brand-orange">Tillu</span>
                <span className="text-brand-text"> Tapri</span>
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              Tapri Wala Taste, Dil Se ❤️<br />
              Thank you for supporting local.<br />We serve with love.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-lg bg-brand-bg flex items-center justify-center text-brand-muted ${s.color} transition-colors duration-200 border border-brand-border hover:border-current`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-brand-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-brand-muted hover:text-brand-orange text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-brand-orange text-xs">▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-brand-text mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiPhone className="text-brand-orange mt-0.5 flex-shrink-0" size={14} />
                <a
                  href="tel:+919876543210"
                  className="text-brand-muted hover:text-brand-orange text-sm transition-colors duration-200"
                >
                  +91 98765-43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-brand-orange mt-0.5 flex-shrink-0" size={14} />
                <a
                  href="mailto:tillutapri@gmail.com"
                  className="text-brand-muted hover:text-brand-orange text-sm transition-colors duration-200"
                >
                  tillutapri@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-brand-orange mt-0.5 flex-shrink-0" size={14} />
                <span className="text-brand-muted text-sm">
                  Kanpur, Uttar Pradesh
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-display font-bold text-brand-text mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              {[
                { day: 'Mon – Fri', time: '9:00 AM – 11:00 PM' },
                { day: 'Saturday',  time: '9:00 AM – 11:30 PM' },
                { day: 'Sunday',    time: '10:00 AM – 10:00 PM' },
              ].map(h => (
                <li key={h.day} className="flex items-start gap-3">
                  <FiClock className="text-brand-orange mt-0.5 flex-shrink-0" size={14} />
                  <div>
                    <p className="text-brand-text text-sm font-medium">{h.day}</p>
                    <p className="text-brand-muted text-xs">{h.time}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Live indicator */}
            <div className="mt-4 flex items-center gap-2">
              <span className="pulse-dot" />
              <span className="text-green-400 text-sm font-medium">Currently Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-brand-muted text-xs">
            © {year} Tillu Tapri. All Rights Reserved.
          </p>
          <p className="text-brand-muted text-xs">
            Made with <span className="text-red-500">❤️</span> for our foodies
          </p>
        </div>
      </div>
    </footer>
  );
}
