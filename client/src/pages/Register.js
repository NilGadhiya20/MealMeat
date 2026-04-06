import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match. Integrity failed.');
    }

    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration node failure. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-900/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-[3.5rem] p-10 lg:p-14 shadow-3xl relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-2xl font-black text-orange-500 mb-6 hover:scale-105 transition-transform tracking-tighter">
            MealMate
          </Link>
          <h2 className="text-4xl font-black text-stone-800 tracking-tight">Create Account</h2>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mt-2">Initialize new user node</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black tracking-widest uppercase text-center border border-red-100">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Identity</label>
            <input
              name="name" type="text" required
              value={form.name} onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Node</label>
            <input
              name="email" type="email" required
              value={form.email} onChange={handleChange}
              placeholder="you@domain.com"
              className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Security Key</label>
            <input
              name="password" type="password" required
              value={form.password} onChange={handleChange}
              placeholder="Min. 6 chars"
              minLength="6"
              className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Confirm Key</label>
            <input
              name="confirmPassword" type="password" required
              value={form.confirmPassword} onChange={handleChange}
              placeholder="Verify Security Key"
              minLength="6"
              className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
            />
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-stone-900 hover:bg-orange-500 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl transition-all shadow-2xl disabled:opacity-50 mt-4 active:scale-95 flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Initializing...
              </>
            ) : (
              'Create Identity'
            )}
          </motion.button>
        </form>

        <p className="mt-12 text-center text-[10px] font-black text-stone-400 uppercase tracking-widest">
          Already synced?{' '}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login Node
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
