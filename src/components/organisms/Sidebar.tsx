'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Tags,
  User,
  LogOut,
  ChevronRight,
  Settings,
  X,
  Moon,
  Sun,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
  ];

  const accountItems = [
    { name: 'Profile', href: '/admin/profile', icon: User },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        'fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-card border-r border-border flex flex-col overflow-hidden transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>

        {/* Logo Section */}
        <div className="p-6 relative shrink-0">
          <Link href="/admin" className="flex items-center gap-3 group" onClick={onClose}>
            <img 
              src="/BLog.png" 
              alt="BLog Logo" 
              className="w-10 h-10 object-contain group-hover:rotate-12 transition-all duration-500 drop-shadow-md" 
            />
            <div>
              <h1 className="text-xl font-black text-foreground tracking-tight">Admin<span className="text-indigo-500">BLog</span></h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mt-0.5">Vitesse Engine Pro</p>
            </div>
          </Link>
        </div>

        {/* Navigation - scrollable */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto relative z-10" style={{ scrollbarWidth: 'none' }}>
          {/* Main Links */}
          <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Main</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden',
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-500 font-semibold shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/50"></div>
                )}
                <item.icon size={20} className={cn('transition-transform duration-300 group-hover:scale-110', isActive && 'text-indigo-500')} />
                <span className="flex-1 text-sm">{item.name}</span>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}

          {/* Account Links */}
          <div className="pt-6 pb-2">
            <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Account</p>
            {accountItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden',
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-500 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/50"></div>
                  )}
                  <item.icon size={20} className={cn('transition-transform duration-300 group-hover:scale-110', isActive && 'text-indigo-500')} />
                  <span className="flex-1 text-sm">{item.name}</span>
                  {isActive && <ChevronRight size={14} className="opacity-50" />}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle (Desktop) */}
          <div className="pt-2 pb-2">
            <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Appearance</p>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 group"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="flex-1 text-sm text-left">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                  <span className="flex-1 text-sm text-left font-medium">Dark Mode</span>
                </>
              )}
              <div className={cn(
                'w-9 h-5 rounded-full relative transition-colors duration-300',
                theme === 'light' ? 'bg-indigo-500' : 'bg-secondary'
              )}>
                <div className={cn(
                  'absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300',
                  theme === 'light' ? 'left-5' : 'left-1'
                )}></div>
              </div>
            </button>
          </div>
        </nav>

        {/* Logout Footer */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-xl relative z-20 shrink-0">
          <Button
            variant="danger"
            className="w-full rounded-xl py-3 group/logout"
            onClick={handleLogout}
            isLoading={isLoggingOut}
            leftIcon={<LogOut size={18} className="group-hover/logout:-translate-x-1 transition-transform" />}
          >
            Sign Out
          </Button>
          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Server Live
          </div>
        </div>
      </aside>
    </>
  );
}
