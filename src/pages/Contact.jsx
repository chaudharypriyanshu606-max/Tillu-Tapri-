// ============================================================
// src/pages/Contact.jsx
// Contact page with info cards, map, WhatsApp, contact form
// ============================================================

import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Phone Number',
      value: '+91 98765-43210',
      href: 'tel:+919876543210',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: 'Chat on WhatsApp',
      href: 'https://wa.me/919876543210?text=Hi%20Tillu%20Tapri!%20I%20want%20to%20order.',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      icon: FiMail,
      title: 'Email',
      value: 'tillutapri@gmail.com',
      href: 'mailto:tillutapri@gmail.com',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      icon: FiMapPin,
      title: 'Address',
      value: 'Kanpur, Uttar Pradesh',
      href: 'https://maps.google.com/?q=Kanpur,Uttar Pradesh',
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10',
    },
    {
      icon: FiClock,
      title: 'Opening Hours',
      value: '9:00 AM – 11:00 PM',
      href: null,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <div
        className="relative pt-24 pb-12 px-4 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=400&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-bg/88" />
        <div className="relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-black text-brand-text mb-3">
            Get In <span className="text-brand-orange">Touch</span>
          </h1>
          <p className="text-brand-muted text-lg">
            We'd love to hear from you. Order, feedback or just say hi 👋
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Contact Info ──────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-brand-text text-xl mb-2">
              We're Here!
            </h2>

            {contactInfo.map(info => (
              <div
                key={info.title}
                className={`flex items-start gap-4 p-4 bg-brand-card rounded-2xl border border-brand-border ${
                  info.href ? 'hover:border-brand-orange/40 transition-colors duration-200 cursor-pointer' : ''
                }`}
                onClick={() => info.href && window.open(info.href, '_blank')}
              >
                <div className={`w-11 h-11 rounded-xl ${info.bg} flex items-center justify-center ${info.color} flex-shrink-0`}>
                  <info.icon size={20} />
                </div>
                <div>
                  <p className="text-brand-muted text-xs mb-0.5">{info.title}</p>
                  <p className={`font-semibold text-sm ${info.href ? info.color : 'text-brand-text'}`}>
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            {/* WhatsApp order button */}
            <a
              id="whatsapp-order-btn"
              href="https://wa.me/919876543210?text=Hi%20Tillu%20Tapri!%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg mt-2"
            >
              <FaWhatsapp size={22} />
              Order on WhatsApp
            </a>
          </div>

          {/* ── Map + Form ────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-brand-border h-64">
              <iframe
                title="Tillu Tapri Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d458283.11009637415!2d79.65173019999999!3d26.449923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1718616000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact form */}
            <div className="bg-brand-card rounded-2xl border border-brand-border p-6 md:p-8">
              <h2 className="font-display font-bold text-brand-text text-xl mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-10">
                  <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center">
                    <FiCheck className="text-green-400" size={32} />
                  </div>
                  <h3 className="font-display font-bold text-brand-text text-xl">Message Sent!</h3>
                  <p className="text-brand-muted text-center">
                    We'll get back to you within 24 hours. 🙏
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-brand-muted text-xs font-medium mb-1.5 block">Your Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Rahul Yadav"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-brand-muted text-xs font-medium mb-1.5 block">Your Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="rahul@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-brand-muted text-xs font-medium mb-1.5 block">Phone (Optional)</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 98765-43210"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-brand-muted text-xs font-medium mb-1.5 block">Your Message *</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center py-3.5 px-8"
                    >
                      {loading ? (
                        <><div className="spinner w-5 h-5 border-2" /> Sending...</>
                      ) : (
                        <><FiSend size={16} /> Send Message</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
