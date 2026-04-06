import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api';

const Toast = ({ message, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed top-24 right-6 z-[100] flex items-center gap-4 bg-stone-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
  >
    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-orange-500/20">!</div>
    <div>
      <p className="font-black text-xs uppercase tracking-widest">{message}</p>
      <p className="text-stone-400 text-[10px] font-bold mt-0.5">We'll get back to you within 24 hours.</p>
    </div>
    <button onClick={onClose} className="ml-4 text-stone-500 hover:text-white transition-colors font-black uppercase text-[10px]">Close</button>
  </motion.div>
);

const INFO = [
  { label: 'Email Us', value: 'nilgadhiya20@gmail.com', sub: '24/7 Priority Support' },
  { label: 'Call Us', value: '+91 97141 80225', sub: 'Mon–Sat, 9AM – 8PM' },
  { label: 'Location', value: 'MINE - 20, Sunday Hub, Katargam, Surat, Gujarat', sub: 'Surat, Gujarat' },
];

const SUBJECTS = [
  'Order Issue',
  'Payment Problem',
  'Restaurant Feedback',
  'Partnership Inquiry',
  'General Question',
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await API.post('/contact', form);
      setToast(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setToast(false), 6000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to sync with kitchen. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 overflow-x-hidden">
      
      <AnimatePresence>
        {toast && <Toast message="Message Synced!" onClose={() => setToast(false)} />}
      </AnimatePresence>

      {/* ── HEADER ────────────────────────────────────────── */}
      <section className="bg-stone-900 text-white pt-24 pb-44 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-block bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
            Get In Touch
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6">
            We're strictly <br />
            <span className="text-orange-500 text-opacity-90">Listening.</span>
          </h1>
          <p className="text-stone-400 font-medium max-w-xl mx-auto text-lg">
            Whether it's an order glitch or a partnership spark, our team is ready to assist you.
          </p>
        </motion.div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 -mt-24 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: FORM */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 glass-card rounded-[3.5rem] p-10 lg:p-16 shadow-3xl"
        >
          <h2 className="text-3xl font-black text-stone-800 mb-10 tracking-tight">Rapid Response Form</h2>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Identity</label>
                <input
                  name="name" type="text" placeholder="Your Name"
                  value={form.name} onChange={handleChange} required
                  className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Node</label>
                <input
                  name="email" type="email" placeholder="you@domain.com"
                  value={form.email} onChange={handleChange} required
                  className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Subject Matter</label>
                <select
                  name="subject" value={form.subject} onChange={handleChange} required
                  className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800 appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Phone (Opt)</label>
                <input
                  name="phone" type="tel" placeholder="+91"
                  value={form.phone} onChange={handleChange}
                  className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Detailed Message</label>
              <textarea
                name="message" rows={5} placeholder="Describe your inquiry..."
                value={form.message} onChange={handleChange} required
                className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-5 rounded-3xl transition-all outline-none font-bold text-stone-800 resize-none"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={sending}
              className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-orange-500 transition-all disabled:opacity-50"
            >
              {sending ? 'Processing Node...' : 'Transmit Message'}
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT: INFO CARDS */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-black text-stone-800 ml-4 mb-8 tracking-widest uppercase">Direct Nodes</h3>
          
          {INFO.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="glass-card rounded-3xl p-8 hover:bg-orange-50 transition-colors border-white group"
            >
              <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2 group-hover:translate-x-1 transition-transform">{item.label}</p>
              <p className="text-xl font-black text-stone-800 mb-1">{item.value}</p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">{item.sub}</p>
            </motion.div>
          ))}

          <div className="p-8 bg-stone-900 rounded-[3rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
            <h4 className="text-lg font-black mb-4">Support Radius</h4>
            <p className="text-xs text-stone-400 font-medium leading-relaxed mb-6">Our response nodes are active across the nation, ensuring your culinary issues are resolved in record time.</p>
            <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-black">ACTIVE</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
