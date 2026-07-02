import { useEffect } from "react";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-fade-in">
      <div className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-xl font-semibold">
        ⚠️ {message}
      </div>
    </div>
  );
}