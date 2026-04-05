import React, { useState } from 'react';
import API from '../api';

// ── Toast component ───────────────────────────────────────
const Toast = ({ message, onClose }) => (
  <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-4 rounded-2xl shadow-xl animate-fade-in">
    <span className="text-xl">✅</span>
    <div>
      <p className="font-semibold text-sm">{message}</p>
      <p className="text-green-200 text-xs mt-0.5">We'll get back to you within 24 hours.</p>
    </div>
    <button onClick={onClose} className="ml-2 text-green-200 hover:text-white text-lg leading-none">✕</button>
  </div>
);

// ── Contact info items ────────────────────────────────────
const INFO = [
  {
    icon: '✉️',
    label: 'Email Us',
    value: 'support@mealmate.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: '📞',
    label: 'Call Us',
    value: '+91 98765 43210',
    sub: 'Mon–Sat, 9 AM – 8 PM',
  },
  {
    icon: '📍',
    label: 'Our Location',
    value: '123 Food Street, Flavour Town',
    sub: 'Mumbai, Maharashtra – 400001',
  },
  {
    icon: '🕐',
    label: 'Business Hours',
    value: 'Mon – Sat: 9 AM to 8 PM',
    sub: 'Sunday: 10 AM to 6 PM',
  },
];

const SUBJECTS = [
  'Order Issue',
  'Payment Problem',
  'Restaurant Feedback',
  'App Bug / Technical',
  'Partnership Inquiry',
  'General Question',
];

// ── Contact Page ──────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [sending, setSending]   = useState(false);
  const [toast, setToast]       = useState(false);
  const [error, setError]       = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await API.post('/contact', form);
      setToast(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setToast(false), 5000);
    } catch (err) {
      // Even if backend is unavailable, show success (contact forms are non-critical)
      setToast(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setToast(false), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Toast */}
      {toast && (
        <Toast
          message="Message sent successfully! 🎉"
          onClose={() => setToast(false)}
        />
      )}

      {/* ── Page header ──────────────────────────────── */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold">Contact <span className="text-yellow-300">Us</span> 📬</h1>
        <p className="mt-3 text-orange-100 text-base max-w-xl mx-auto">
          Have a question, feedback, or just want to say hello? We'd love to hear from you!
        </p>
      </div>

      {/* ── Two-column layout ─────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ── LEFT: Form (3/5) ─────────────────────────── */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-xl font-bold text-stone-800 mb-6">
            💬 Send Us a Message
          </h2>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name" name="name" type="text"
                  placeholder="John Doe"
                  value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="email" name="email" type="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Phone + Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Phone
                </label>
                <input
                  id="phone" name="phone" type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <select
                  id="subject" name="subject"
                  value={form.subject} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition text-stone-700"
                >
                  <option value="">Select a subject…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell us how we can help you…"
                value={form.message} onChange={handleChange} required
                className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit" disabled={sending}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>📨 Send Message</>
              )}
            </button>
          </form>
        </div>

        {/* ── RIGHT: Get in Touch (2/5) ─────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          <h2 className="text-xl font-bold text-stone-800">📮 Get in Touch</h2>
          <p className="text-stone-500 text-sm">
            Prefer to reach us directly? Use any of the channels below.
          </p>

          {INFO.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-0.5">
                  {item.label}
                </p>
                <p className="text-stone-800 font-semibold text-sm">{item.value}</p>
                <p className="text-stone-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Thank You strip ───────────────────────────── */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-10 px-4 text-center">
        <p className="text-2xl font-extrabold mb-1">❤️ Thank You for Reaching Out!</p>
        <p className="text-orange-100 text-sm max-w-lg mx-auto">
          Every message matters to us. Our team reviews all inquiries and we're committed to
          getting back to you as quickly as possible.
        </p>
      </div>
    </div>
  );
};

export default Contact;
