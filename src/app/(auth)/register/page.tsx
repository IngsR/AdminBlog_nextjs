'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Loader2, ArrowRight, User, Mail, Lock, FileText } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, fullName, bio }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:border-white/20 group">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-600 mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
          <UserPlus className="text-white" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Admin</h1>
        <p className="text-zinc-400 text-sm">Join the AdminBLog management portal</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-shake">
          <div className="w-1 h-1 rounded-full bg-red-500"></div>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors">
            <span className="font-bold text-xs">FN</span>
          </div>
          <input
            type="text"
            required
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <FileText className="absolute left-4 top-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <textarea
            placeholder="Introduce yourself (Bio)..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group/btn"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Register Account
              <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <p className="text-zinc-500 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
