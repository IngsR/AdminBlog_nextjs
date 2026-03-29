'use client';

import { Menu, Sparkles, User, Bell } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 z-30 lg:hidden flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
        
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Sparkles className="text-white" size={16} />
          </div>
          <h1 className="text-lg font-black text-white tracking-tight">Admin<span className="text-indigo-500">BLog</span></h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-zinc-500 hover:text-indigo-400 transition-colors">
          <Bell size={20} />
        </button>
        <Link href="/admin/profile" className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 overflow-hidden">
          <User size={18} />
        </Link>
      </div>
    </header>
  );
}
