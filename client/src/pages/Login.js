import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      setError(err.message || 'Invalid email or password');
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
          <h2 className="text-3xl font-extrabold text-stone-800">Welcome Back!</h2>
          <p className="text-stone-500 mt-2 text-sm">Please sign in to your account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition text-stone-700"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-stone-600 font-medium">
              <input type="checkbox" className="w-4 h-4 text-orange-500 border-stone-300 rounded focus:ring-orange-400" />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-stone-500">
          New to MealMate?{' '}
          <Link to="/register" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
