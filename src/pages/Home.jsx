// ============================================================
// src/pages/Home.jsx
// Landing page: Hero, Popular Items, Why Us, Services, Testimonials
// ============================================================

import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiTruck, FiShield, FiStar, FiHeart,
  FiMail, FiMapPin, FiPercent, FiSmartphone,
} from 'react-icons/fi';
import {
  FaWhatsapp, FaLeaf, FaBolt, FaAward, FaFire,
} from 'react-icons/fa';
import { MdMenuBook, MdContactPhone } from 'react-icons/md';
import FoodCard from '../components/FoodCard';
import TestimonialCard from '../components/TestimonialCard';
import ServiceCard from '../components/ServiceCard';
import { menuItems, testimonials } from '../data/menuData';

// Featured items shown on home page
const featured = menuItems
  .filter(item => item.isFeatured)
  .slice(0, 4);

// Why Choose Us reasons
const whyUs = [
  { icon: FaLeaf,   title: 'Fresh Ingredients', desc: 'Always fresh & quality ingredients.' },
  { icon: FaBolt, title: 'Fast Delivery', desc: 'Quick delivery at your doorstep.' },
  { icon: FiPercent,title: 'Pocket Friendly',    desc: 'Great taste at reasonable prices.' },
  { icon: FiShield, title: 'Hygienic Kitchen',   desc: 'Clean, safe & hygienic kitchen.' },
];

// Services section
const services = [
  { icon: MdMenuBook,    title: 'Menu',             description: 'Explore our wide variety of delicious items.' },
  { icon: MdContactPhone,title: 'Contact Us',       description: 'Reach us anytime for help or feedback.' },
  { icon: FaWhatsapp,    title: 'WhatsApp Ordering', description: 'Order directly via WhatsApp in seconds.' },
  { icon: FiMail,        title: 'Email Support',    description: "Drop us an email and we'll respond fast." },
  { icon: FiTruck,       title: 'Fast Delivery',    description: 'Hot food at your door in 30 minutes.' },
  { icon: FiPercent,     title: 'Offers & Discounts',description: 'Exclusive deals and promo codes daily.' },
  { icon: FiMapPin,      title: 'Location',         description: 'Find us at Kanpur, Uttar Pradesh.' },
  { icon: FiHeart,       title: 'About Us',         description: 'Learn our story and our food philosophy.' },
];

export default function Home() {
  return (
    <div className="animate-fade-in">

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&h=900&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 w-full">
          <div className="max-w-2xl animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 rounded-full px-4 py-2 mb-6">
              <FaFire className="text-brand-orange" size={14} />
              <span className="text-brand-orange text-sm font-medium">Now Delivering Near You</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black text-brand-text leading-tight mb-4 text-shadow">
              <span className="text-brand-orange">Tillu</span> Tapri
            </h1>
            <p className="font-display text-xl md:text-2xl text-brand-orange font-semibold mb-4">
              Tapri Wala Taste, Dil Se
            </p>
            <p className="text-brand-muted text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Delicious food, hygienic kitchen and fast delivery at your doorstep.
              From chai to burgers — we've got everything!
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/menu" id="hero-order-btn" className="btn-primary flex items-center gap-2 text-base py-3.5 px-7">
                🛵 Order Now <FiArrowRight size={18} />
              </Link>
              <Link to="/menu" id="hero-explore-btn" className="btn-outline flex items-center gap-2 text-base py-3.5 px-7">
                Explore Menu
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: '500+', label: 'Happy Customers' },
                { value: '4.8★', label: 'Average Rating'  },
                { value: '30min', label: 'Fast Delivery'   },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-display font-bold text-xl md:text-2xl text-brand-orange">{s.value}</p>
                  <p className="text-brand-muted text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="text-brand-muted text-xs">Scroll Down</span>
          <div className="w-5 h-8 border-2 border-brand-muted rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-brand-orange rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Popular Items ─────────────────────────────────────── */}
      <section id="popular-items" className="section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-brand-orange" />
                <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
                  Top Picks
                </span>
                <div className="w-8 h-0.5 bg-brand-orange" />
              </div>
              <h2 className="section-title">Popular Items</h2>
            </div>
            <Link
              to="/menu"
              id="view-all-btn"
              className="text-brand-orange hover:text-brand-orange-light font-semibold text-sm flex items-center gap-1 transition-colors duration-200"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────── */}
      <section id="why-us" className="section-pad bg-brand-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-brand-orange" />
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Our Promise</span>
              <div className="w-8 h-0.5 bg-brand-orange" />
            </div>
            <h2 className="section-title">Why Choose <span className="text-brand-orange">Tillu Tapri</span>?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyUs.map(item => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-brand-card border border-brand-border hover:border-brand-orange/40 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 group-hover:shadow-orange">
                  <item.icon size={24} />
                </div>
                <h3 className="font-display font-bold text-brand-text text-sm md:text-base">{item.title}</h3>
                <p className="text-brand-muted text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Section ──────────────────────────────────── */}
      <section id="services" className="section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-brand-orange" />
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <div className="w-8 h-0.5 bg-brand-orange" />
            </div>
            <h2 className="section-title">Our <span className="text-brand-orange">Services</span></h2>
            <p className="section-subtitle">Everything you need, all in one place.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {services.map(s => (
              <ServiceCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section id="testimonials" className="section-pad bg-brand-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-brand-orange" />
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Reviews</span>
              <div className="w-8 h-0.5 bg-brand-orange" />
            </div>
            <h2 className="section-title">What Our <span className="text-brand-orange">Customers</span> Say</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(t => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C38 50%, #E05A00 100%)',
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
                🎉 Get 20% OFF on First Order!
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Use code <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">TAPRI20</span> at checkout
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold py-3.5 px-8 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Order Now <FiArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
