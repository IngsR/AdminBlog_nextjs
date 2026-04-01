'use client';

import { Menu, User, Bell, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/lib/ThemeContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-card/90 backdrop-blur-xl border-b border-border z-30 lg:hidden flex items-center justify-between px-4 transition-colors duration-300">
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="Toggle Menu"
        >
          <Menu size={22} />
        </button>

        <Link href="/admin" className="flex items-center gap-2 min-w-0">
          <Image src="/BLog.png" alt="BLog Logo" width={28} height={28} className="object-contain shrink-0 drop-shadow-sm" />
          <h1 className="text-base font-black text-foreground tracking-tight truncate">
            Admin<span className="text-indigo-500">BLog</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:text-indigo-500 transition-colors rounded-lg hover:bg-secondary"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-amber-400" />
          ) : (
            <Moon size={18} className="text-indigo-400" />
          )}
        </button>

        {/* Notifications */}
        <button className="p-2 text-muted-foreground hover:text-indigo-500 transition-colors rounded-lg hover:bg-secondary relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <Link
          href="/admin/profile"
          className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground overflow-hidden hover:border-indigo-500/50 transition-colors"
        >
          <User size={16} />
        </Link>
      </div>
    </header>
  );
}
