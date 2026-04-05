import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password
        // isStudent will be false by default based on schema
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-stone-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-2xl mb-4 hover:scale-110 transition-transform">
            🍽️
          </Link>
          <h2 className="text-3xl font-extrabold text-stone-800">Create Account</h2>
          <p className="text-stone-500 mt-2 text-sm">Join MealMate for the best food delivery</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="name">
              Full Name
            </label>
            <input
              id="name" name="name" type="text" required
              value={form.name} onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition text-stone-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email" name="email" type="email" required
              value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition text-stone-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password" name="password" type="password" required
              value={form.password} onChange={handleChange}
              placeholder="••••••••"
              minLength="6"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition text-stone-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword" name="confirmPassword" type="password" required
              value={form.confirmPassword} onChange={handleChange}
              placeholder="••••••••"
              minLength="6"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition text-stone-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
