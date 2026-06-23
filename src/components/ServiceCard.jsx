// ============================================================
// src/components/ServiceCard.jsx
// Icon + title + description service card for home page
// ============================================================

export default function ServiceCard({ icon: Icon, title, description, color = 'text-brand-orange' }) {
  return (
    <div className="card p-6 flex flex-col items-center text-center gap-4 group cursor-default">
      <div className={`w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center ${color} transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-orange`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-display font-semibold text-brand-text mb-1 text-sm md:text-base">
          {title}
        </h3>
        <p className="text-brand-muted text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
