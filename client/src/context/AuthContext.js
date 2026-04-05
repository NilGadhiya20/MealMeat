import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api';

const AuthContext = createContext();

const persist = (token, user) => {
  localStorage.setItem('mealmateToken', token);
  localStorage.setItem('mealmateUser', JSON.stringify(user));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mealmateUser')) || null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync state when Navbar dispatches a storage event (Student Mode toggle)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'mealmateUser') {
        try { setUser(JSON.parse(e.newValue) || null); }
        catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const login = async (email, password) => {
    setLoading(true); setError(null);
    try {
      const { data } = await loginUser({ email, password });
      persist(data.token, data.user);
      setUser(data.user);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.msg || 'Login failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  };

  const register = async (formData) => {
    setLoading(true); setError(null);
    try {
      const { data } = await registerUser(formData);
      persist(data.token, data.user);
      setUser(data.user);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.msg || 'Registration failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mealmateToken');
    localStorage.removeItem('mealmateUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
