import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ShieldAlert, ArrowRight, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiLogin } from '../../api/client';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiLogin({ username, password });
      login(response.token, { username: response.username, email: response.email, role: response.role });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-flame-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl border border-amber-500/20 shadow-2xl relative z-10 space-y-8"
      >
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center mx-auto text-navy-950 shadow-lg shadow-gold-500/20">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-white">Media Club Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Sreyas Institute of Engineering and Technology</p>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 text-xs text-red-300"
          >
            <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full bg-navy-900/80 border border-amber-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-navy-900/80 border border-amber-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-amber-500/10">
          <p className="text-[11px] text-slate-500">
            Protected Administrator System • Sreyas SIET
          </p>
        </div>
      </motion.div>
    </div>
  );
};
