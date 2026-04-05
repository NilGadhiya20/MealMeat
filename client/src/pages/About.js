import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Key Features data ─────────────────────────────────────
const FEATURES = [
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Find the perfect meal instantly by name, category, mood, or cuisine — powered by real-time filters.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: '🎓',
    title: 'Student Mode',
    desc: 'Automatically filters meals under ₹100 and surfaced budget-friendly options designed for students.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: '😋',
    title: 'Mood Food',
    desc: 'Not sure what to eat? Pick your mood — Spicy, Comfort, Healthy, Sweet or Quick — and we\'ll match it.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: '📊',
    title: 'Crowd Indicator',
    desc: 'See live crowd levels at each restaurant — Low, Medium, or High — before you order or visit.',
    color: 'bg-green-50 text-green-600',
  },
];

// ── Crowd level cards ─────────────────────────────────────
const CROWD_LEVELS = [
  {
    level: 'Low',
    emoji: '😌',
    icon: '🟢',
    color: 'border-green-400',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
    bar: 'bg-green-400',
    barWidth: 'w-1/4',
    desc: 'Restaurant is quiet right now. Best time to dine in, enjoy your meal without waiting, and get fast delivery.',
    tip: 'Great time to visit!',
  },
  {
    level: 'Medium',
    emoji: '🙂',
    icon: '🟡',
    color: 'border-yellow-400',
    bg: 'bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
    bar: 'bg-yellow-400',
    barWidth: 'w-1/2',
    desc: 'Moderate crowd. Expect a slight wait during peak hours, but service is still smooth and efficient.',
    tip: 'Usually fine to order.',
  },
  {
    level: 'High',
    emoji: '😅',
    icon: '🔴',
    color: 'border-red-400',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    bar: 'bg-red-400',
    barWidth: 'w-3/4',
    desc: 'Restaurant is currently very busy. Delivery may take longer. Consider scheduling for later or choosing another.',
    tip: 'Expect delays.',
  },
];

// ── About Page ───────────────────────────────────────────
const About = () => {
  const [studentMode, setStudentMode] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 font-sans">

      {/* ── 1. Hero / Caption Section ──────────────────── */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-5">
              About MealMate
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Smarter Food Ordering,<br />
              <span className="text-yellow-300">Built for Everyone 🍽️</span>
            </h1>
            <p className="mt-5 text-orange-100 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              MealMate is a smart food discovery and ordering platform that helps you find
              the right meal based on your <strong className="text-white">budget, mood, and time</strong>.
              We partner with local restaurants to bring you fresh, affordable food —
              with real-time crowd insights so you always order at the right moment.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/login"
                className="bg-white text-orange-600 font-bold px-7 py-3 rounded-full hover:bg-yellow-50 transition-colors shadow-md"
              >
                Get Started 🚀
              </Link>
              <Link
                to="/"
                className="border-2 border-white/60 text-white font-bold px-7 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Explore Menu →
              </Link>
            </div>
          </div>

          {/* Food image / illustration */}
          <div className="flex-shrink-0 text-center">
            <div className="relative inline-block">
              <div className="text-[9rem] drop-shadow-2xl select-none animate-bounce">🍛</div>
              <div className="absolute -top-2 -right-4 text-4xl animate-spin-slow select-none">🌟</div>
              <div className="absolute bottom-2 -left-6 text-3xl select-none">🍕</div>
              <div className="absolute -bottom-2 -right-2 text-3xl select-none">🥗</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Key Features ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-stone-800">Why Choose MealMate?</h2>
          <p className="mt-2 text-stone-500 text-base">Everything you need to find and order the perfect meal.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-stone-800 text-base mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Student Mode Highlight ───────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-stone-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">

          {/* Background decoration */}
          <div className="absolute top-0 right-0 text-[12rem] opacity-5 select-none pointer-events-none leading-none">🎓</div>

          <div className="relative flex flex-col lg:flex-row gap-10 items-start">

            {/* Left — text */}
            <div className="flex-1">
              <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
                🎓 Student Mode
              </span>
              <h2 className="text-3xl font-extrabold mb-4">
                Designed for<br />
                <span className="text-orange-400">Student Budgets</span>
              </h2>
              <p className="text-stone-400 text-base leading-relaxed mb-6">
                Eating well on a tight budget is hard. Student Mode makes it effortless —
                instantly filtering the entire app to show only what fits your wallet.
              </p>

              <ul className="space-y-3">
                {[
                  'Filter meals by student meal budget',
                  'Show only food types suitable for quick meals',
                  'Filter by price under ₹100 automatically',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    <span className="text-stone-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — interactive toggle demo */}
            <div className="w-full lg:w-72 bg-stone-800 rounded-2xl p-6 flex-shrink-0">
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-5">Live Preview</p>

              {/* Toggle */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white font-semibold">Student Mode</span>
                <button
                  onClick={() => setStudentMode((v) => !v)}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                    studentMode ? 'bg-orange-500' : 'bg-stone-600'
                  }`}
                  aria-label="Toggle student mode demo"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      studentMode ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Status pills */}
              <div className="space-y-3">
                {[
                  { label: 'Budget Cap', off: 'No limit', on: '₹100 max' },
                  { label: 'Meal Filter', off: 'All types', on: 'Quick meals only' },
                  { label: 'Price Filter', off: 'All prices', on: 'Under ₹100' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-stone-400">{item.label}</span>
                    <span className={`font-semibold px-3 py-0.5 rounded-full text-xs ${
                      studentMode
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-stone-700 text-stone-400'
                    }`}>
                      {studentMode ? item.on : item.off}
                    </span>
                  </div>
                ))}
              </div>

              <p className={`mt-5 text-center text-xs font-bold py-2 rounded-xl transition-colors ${
                studentMode
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-stone-700 text-stone-500'
              }`}>
                {studentMode ? '🎓 Student Mode Active!' : 'Toggle to see the difference'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Real-time Crowd Levels ──────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-stone-800">
            📊 Real-Time Crowd Levels
          </h2>
          <p className="mt-2 text-stone-500 text-base">
            Know how busy a restaurant is before you order. No more long waits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CROWD_LEVELS.map((c) => (
            <div
              key={c.level}
              className={`${c.bg} border-2 ${c.color} rounded-2xl p-6 hover:shadow-md transition-shadow`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.emoji}</span>
                  <h3 className="font-bold text-stone-800 text-lg">{c.level} Crowd</h3>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>
                  {c.icon} {c.level}
                </span>
              </div>

              {/* Crowd bar */}
              <div className="w-full h-2.5 bg-stone-200 rounded-full mb-4 overflow-hidden">
                <div className={`h-full ${c.bar} ${c.barWidth} rounded-full transition-all`} />
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-4">{c.desc}</p>

              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${c.badge}`}>
                💡 {c.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-stone-400 text-sm mt-8">
          Crowd levels are updated in real-time by restaurant partners so you can make smarter ordering decisions.
        </p>
      </section>
    </div>
  );
};

export default About;
