import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Identity verification failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-stone-900/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-[3rem] p-10 lg:p-14 shadow-3xl relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-block text-2xl font-black text-orange-500 mb-8 hover:scale-105 transition-transform tracking-tighter">
            MealMate
          </Link>
          <h2 className="text-4xl font-black text-stone-800 tracking-tight">Welcome Back</h2>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mt-2">Initialize your session</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black tracking-widest uppercase text-center border border-red-100">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1" htmlFor="email">Email Node</label>
            <input
              id="email" name="email" type="email" required
              value={form.email} onChange={handleChange}
              placeholder="you@domain.com"
              className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1" htmlFor="password">Security Key</label>
            <input
              id="password" name="password" type="password" required
              value={form.password} onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-stone-50 border-2 border-transparent focus:border-stone-200 focus:bg-white px-6 py-4 rounded-2xl transition-all outline-none font-bold text-stone-800"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-stone-900 hover:bg-orange-500 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl transition-all shadow-2xl disabled:opacity-50 active:scale-95 flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Transmitting...'
            )}
          </button>
        </form>

        <p className="mt-12 text-center text-[10px] font-black text-stone-400 uppercase tracking-widest">
          New to the hub?{' '}
          <Link to="/register" className="text-orange-500 hover:underline">
            Register Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
