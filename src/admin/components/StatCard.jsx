// ============================================================
// src/admin/components/StatCard.jsx
// Large KPI tile for admin dashboard
// ============================================================

export default function StatCard({ icon: Icon, label, value, color = 'text-brand-orange', bg = 'bg-brand-orange/10', onClick }) {
  return (
    <button
      onClick={onClick}
      className="card p-5 flex flex-col gap-3 text-left w-full active:scale-95 transition-transform duration-150"
    >
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className={`font-display font-black text-3xl ${color}`}>{value}</p>
        <p className="text-brand-muted text-sm mt-0.5">{label}</p>
      </div>
    </button>
  );
}
