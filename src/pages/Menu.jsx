// ============================================================
// src/pages/Menu.jsx
// Full menu page with category filters, search, and food cards
// ============================================================

import { useState, useMemo } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';
import FoodCard from '../components/FoodCard';
import { menuItems, categories } from '../data/menuData';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [vegOnly,        setVegOnly]        = useState(false);

  // ── Filtered items ────────────────────────────────────────
  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCat    = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg    = !vegOnly || item.isVeg;
      return matchesCat && matchesSearch && matchesVeg;
    });
  }, [activeCategory, searchQuery, vegOnly]);

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="min-h-screen animate-fade-in">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div
        className="relative pt-24 pb-12 px-4 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&h=400&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-bg/85" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-0.5 bg-brand-orange" />
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              Explore
            </span>
            <div className="w-8 h-0.5 bg-brand-orange" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-brand-text mb-3">
            Our <span className="text-brand-orange">Menu</span>
          </h1>
          <p className="text-brand-muted text-lg">
            From chai to pizza — handcrafted with love 🧡
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* ── Search + Veg Toggle ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
              size={18}
            />
            <input
              id="menu-search"
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field pl-11 pr-11"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors"
              >
                <FiX size={18} />
              </button>
            )}
          </div>

          {/* Veg filter toggle */}
          <button
            id="veg-filter-btn"
            onClick={() => setVegOnly(prev => !prev)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
              vegOnly
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-brand-border text-brand-muted hover:border-green-500/50 hover:text-green-400'
            }`}
          >
            <div className="w-4 h-4 rounded-sm border-2 border-green-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            Veg Only
          </button>
        </div>

        {/* ── Category Tabs ─────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-brand-orange text-white shadow-orange'
                  : 'bg-brand-card border border-brand-border text-brand-muted hover:border-brand-orange/50 hover:text-brand-text'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── Results info ───────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-brand-muted text-sm">
            <span className="text-brand-text font-semibold">{filtered.length}</span> items found
            {searchQuery && (
              <span> for "<span className="text-brand-orange">{searchQuery}</span>"</span>
            )}
          </p>
          {(searchQuery || vegOnly || activeCategory !== 'all') && (
            <button
              onClick={() => { clearSearch(); setVegOnly(false); setActiveCategory('all'); }}
              className="text-brand-orange text-sm flex items-center gap-1 hover:text-brand-orange-light transition-colors"
            >
              <FiX size={14} /> Clear Filters
            </button>
          )}
        </div>

        {/* ── Food Grid ─────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">😕</span>
            <h3 className="font-display font-bold text-brand-text text-xl">No items found</h3>
            <p className="text-brand-muted text-center">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => { clearSearch(); setVegOnly(false); setActiveCategory('all'); }}
              className="btn-primary mt-2"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ── Bottom Features Bar ──────────────────────────── */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🥗', label: 'Hygienic Food'    },
            { emoji: '🚀', label: 'Fast Delivery'    },
            { emoji: '⭐', label: 'Best Quality'     },
            { emoji: '💰', label: 'Pocket Friendly'  },
          ].map(f => (
            <div
              key={f.label}
              className="flex items-center gap-3 p-4 bg-brand-card rounded-2xl border border-brand-border"
            >
              <span className="text-2xl">{f.emoji}</span>
              <span className="font-semibold text-brand-text text-sm">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
