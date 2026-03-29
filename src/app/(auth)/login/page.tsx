'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Loader2, ArrowRight, User, Lock, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:border-white/20 group animate-in fade-in zoom-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-600 mb-6 shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
          <LogIn className="text-white" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Login</h1>
        <p className="text-zinc-400 text-sm">Welcome back to AdminBLog</p>
      </div>

      {showSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={18} />
          Registration successful! Please login.
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-shake">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group/field">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/field:text-indigo-500 transition-colors" size={20} />
          <input
            type="text"
            required
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
          />
        </div>

        <div className="relative group/field">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/field:text-indigo-500 transition-colors" size={20} />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group/btn"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              Sign In
              <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 text-center border-t border-white/5 pt-6">
        <p className="text-zinc-500 text-sm">
          New to the portal?{' '}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Contact Owner / Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
