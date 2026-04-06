import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'Smart Search',
    desc: 'Find the perfect meal instantly by name, category, mood, or cuisine — powered by real-time filters.',
    color: 'bg-orange-500',
  },
  {
    title: 'Student Mode',
    desc: 'Automatically filters meals under ₹100 and surfaces budget-friendly options designed for students.',
    color: 'bg-stone-900',
  },
  {
    title: 'Mood Food',
    desc: 'Not sure what to eat? Pick your mood — Spicy, Comfort, Healthy, Sweet or Quick — and we\'ll match it.',
    color: 'bg-orange-600',
  },
  {
    title: 'Live Tracking',
    desc: 'Check restaurant crowd levels and estimated delivery times in real-time to plan your perfect meal.',
    color: 'bg-stone-800',
  },
];

const About = () => {
  const [studentMode, setStudentMode] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 overflow-x-hidden">
      
      {/* ── 1. HERO SECTION ───────────────────────────────────── */}
      <section className="relative bg-stone-900 text-white pt-24 pb-40 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-orange-500/20 text-orange-400 text-[10px] font-black tracking-widest uppercase px-5 py-2 rounded-full mb-8 border border-orange-500/30"
          >
            The MealMate Mission
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black leading-tight mb-8 tracking-tighter"
          >
            Smarter Food, <br />
            <span className="text-orange-500">Better Living.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg lg:text-xl text-stone-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            We're redefining how you discover and order food by combining budget-smart filters, mood-based recommendations, and real-time restaurant insights.
          </motion.p>
        </div>
      </section>

      {/* ── 2. FEATURES GRID ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 -mt-20 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="glass-card rounded-[2.5rem] p-8 shadow-2xl hover:scale-[1.02] transition-transform group"
            >
              <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-white font-black text-sm shadow-lg ${f.color}`}>
                {f.title[0]}
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-orange-500 transition-colors">
                {f.title}
              </h3>
              <p className="text-stone-500 text-sm font-medium leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 3. STUDENT MODE INTERACTIVE ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mt-32">
        <div className="glass-card rounded-[4rem] p-10 lg:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex-1">
            <div className="inline-block bg-stone-100 text-stone-500 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Exclusive Technology
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-stone-900 mb-8 tracking-tight">
              Designed for <br />
              <span className="text-orange-500">Student Budgets</span>
            </h2>
            <p className="text-stone-500 text-lg font-medium leading-relaxed mb-10">
              Eating well on a tight budget shouldn't be a struggle. Our proprietary Student Mode instantly recalibrates the entire platform to prioritize affordable, high-quality meals.
            </p>
            
            <div className="space-y-4">
              {['Auto-filter under ₹100', 'Optimized Prep Times', 'Nutrient-Focused Sorting'].map(point => (
                <div key={point} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-white text-[10px] font-black italic">!</div>
                  <span className="font-bold text-stone-700 uppercase text-[11px] tracking-widest">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Demo Card */}
          <motion.div 
            whileHover={{ rotate: -1 }}
            className="w-full lg:w-[400px] bg-stone-900 rounded-[3rem] p-10 shadow-3xl text-white relative group"
          >
            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h4 className="font-black text-xl mb-1 text-orange-500">Student Mode</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Active System</p>
                </div>
                <button 
                  onClick={() => setStudentMode(!studentMode)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${studentMode ? 'bg-orange-500' : 'bg-stone-700'}`}
                >
                  <motion.div 
                    animate={{ x: studentMode ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Budget Cap', val: studentMode ? '₹100' : 'Flexible' },
                  { label: 'Food Zone', val: studentMode ? 'Value' : 'All' },
                  { label: 'Priority', val: studentMode ? 'Student' : 'Default' }
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{item.label}</span>
                    <span className={`font-black text-sm uppercase ${studentMode ? 'text-orange-400' : 'text-stone-300'}`}>{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-4 bg-white/5 rounded-2xl text-center border border-white/5">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-loose italic">
                  {studentMode ? '"Optimal student savings active"' : '"Toggle to simulate student mode"'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. CTA ───────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 mt-32 text-center">
        <h2 className="text-3xl font-black text-stone-800 mb-8">Ready to order smarter?</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            to="/" 
            className="px-10 py-5 bg-orange-500 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-orange-200 hover:scale-105 active:scale-95 transition-all"
          >
            Explore the Menu
          </Link>
          <Link 
            to="/contact" 
            className="px-10 py-5 bg-stone-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Send us a Note
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
