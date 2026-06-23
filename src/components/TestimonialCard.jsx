// ============================================================
// src/components/TestimonialCard.jsx
// Customer review card with star rating and avatar
// ============================================================

import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card p-6 flex flex-col gap-4 relative">
      {/* Quote icon */}
      <FaQuoteLeft className="text-brand-orange/30 absolute top-4 right-5" size={28} />

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={14}
            className={`${
              i < testimonial.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-brand-muted'
            }`}
          />
        ))}
      </div>

      {/* Review */}
      <p className="text-brand-muted text-sm leading-relaxed flex-1 italic">
        "{testimonial.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-brand-border">
        <div className="w-9 h-9 rounded-full bg-orange-gradient flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-brand-text font-semibold text-sm">{testimonial.name}</p>
          <p className="text-brand-muted text-xs">{testimonial.location}</p>
        </div>
        <div className="ml-auto">
          <span className="text-green-400 text-xs flex items-center gap-1">
            <span className="pulse-dot" />
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
