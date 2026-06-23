// ============================================================
// src/pages/About.jsx
// About page: Story, Mission, Hygiene Standards, Delivery
// ============================================================

import { Link } from 'react-router-dom';
import { FiHeart, FiShield, FiTruck, FiAward, FiArrowRight } from 'react-icons/fi';
import { FaLeaf, FaFire } from 'react-icons/fa';

const values = [
  {
    icon: FiHeart,
    title: 'Our Mission',
    description:
      'To provide tasty, hygienic and affordable food to everyone. We believe good food should not be a luxury — it should be accessible to every household.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    icon: FiShield,
    title: 'Hygiene Standards',
    description:
      'We follow strict hygiene standards to ensure safe food. Our kitchen is cleaned daily, and we use only fresh ingredients sourced from trusted vendors.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: FiTruck,
    title: 'Fast Delivery Promise',
    description:
      "We deliver your favourite food hot and fresh at your doorstep. Our average delivery time is 25–35 minutes, and we're constantly improving.",
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
  },
  {
    icon: FiAward,
    title: 'Quality First',
    description:
      "Every dish is made with love and attention to detail. We don't compromise on quality — because our customers deserve the very best.",
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
];

const milestones = [
  { year: '2022', event: 'Tillu Tapri was founded with just a chai stall' },
  { year: '2023', event: 'Expanded menu to include momos, rolls and burgers' },
  { year: '2023', event: 'Crossed 500+ happy customers milestone' },
  { year: '2024', event: 'Launched online ordering & cloud kitchen operations' },
  { year: '2025', event: 'Introduced pizza and full beverage range' },
  { year: '2026', event: 'Serving 1000+ orders every month across Kanpur' },
];

export default function About() {
  return (
    <div className="min-h-screen animate-fade-in">

      {/* ── Header ───────────────────────────────────────────── */}
      <div
        className="relative pt-24 pb-20 px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=600&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-bg/88" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-brand-orange" />
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Our Story</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black text-brand-text mb-6 max-w-2xl leading-tight">
            About <span className="text-brand-orange">Tillu Tapri</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-xl leading-relaxed">
            A humble chai tapri that grew into a beloved cloud kitchen — serving happiness, one dish at a time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* ── Story Section ─────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaFire className="text-brand-orange" size={16} />
              <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
                The Beginning
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-text mb-6 leading-tight">
              From a Tapri to a <span className="text-brand-orange">Cloud Kitchen</span>
            </h2>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>
                Tillu Tapri started with a simple idea — serve delicious food with love, just like a heart should. 
                In 2022, we began as a small chai tapri in Kanpur, where our signature cutting chai and samosas 
                won the hearts of the local community.
              </p>
              <p>
                From cutting chai to cheesy burgers, every item is made with love and affordable food to everyone.
                Our founder, Tillu Bhaiya, believed that great street food shouldn't cost a fortune.
              </p>
              <p>
                Today, we operate a full-fledged cloud kitchen serving hundreds of happy customers every day. 
                But our soul remains the same — the warmth of a local tapri with the quality of a premium restaurant.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Link to="/menu" className="btn-primary flex items-center gap-2">
                Explore Menu <FiArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden h-48 md:h-64">
              <img
                src="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop"
                alt="Our chai"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 md:h-64 mt-8">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop"
                alt="Our burgers"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 md:h-64">
              <img
                src="https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&h=400&fit=crop"
                alt="Our momos"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 md:h-64 mt-8">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop"
                alt="Our pizza"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* ── Values / Cards ───────────────────────────────── */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Our <span className="text-brand-orange">Values</span>
            </h2>
            <p className="section-subtitle">What drives everything we do</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center ${v.color}`}>
                  <v.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-brand-text">{v.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Milestones ───────────────────────────────────── */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Our <span className="text-brand-orange">Journey</span>
            </h2>
            <p className="section-subtitle">From humble beginnings to your favourite cloud kitchen</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-border md:-translate-x-px" />

            <div className="flex flex-col gap-8">
              {milestones.map((m, idx) => (
                <div
                  key={m.year}
                  className={`relative flex gap-6 md:gap-0 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-orange rounded-full -translate-x-1/2 mt-1 shadow-orange flex-shrink-0" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 ${
                      idx % 2 === 0
                        ? 'md:mr-auto md:pr-12 md:max-w-[45%] md:text-right'
                        : 'md:ml-auto md:pl-12 md:max-w-[45%] md:text-left'
                    }`}
                  >
                    <span className="orange-badge mb-2 inline-block">{m.year}</span>
                    <p className="text-brand-text font-medium text-sm">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Banner ─────────────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-brand-card rounded-3xl border border-brand-border p-8">
          {[
            { value: '1000+', label: 'Orders Monthly',    emoji: '📦' },
            { value: '4.8★', label: 'Average Rating',    emoji: '⭐' },
            { value: '8+',   label: 'Food Categories',   emoji: '🍽️'  },
            { value: '30min', label: 'Avg Delivery Time', emoji: '🚀' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">{stat.emoji}</span>
              <span className="font-display font-black text-3xl text-brand-orange">{stat.value}</span>
              <span className="text-brand-muted text-sm">{stat.label}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
