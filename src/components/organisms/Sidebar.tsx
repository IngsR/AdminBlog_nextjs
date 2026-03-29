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
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Profile', href: '/admin/profile', icon: User },
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
        "fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-zinc-950 border-r border-white/5 flex flex-col overflow-hidden transition-transform duration-300 ease-in-out group/sidebar",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
        
        {/* Logo Section */}
        <div className="p-8 relative">
          <Link href="/admin" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:rotate-12 transition-all duration-500">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Admin<span className="text-indigo-500">BLog</span></h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-0.5">Vitesse Engine Pro</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto relative z-10 scrollbar-hide">
          <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                  isActive 
                    ? "bg-indigo-600/10 text-indigo-400 font-semibold shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500/50"></div>
                )}
                <item.icon size={20} className={cn("transition-transform duration-300 group-hover:scale-110", isActive && "text-indigo-500")} />
                <span className="flex-1 text-sm">{item.name}</span>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}

          <div className="pt-8 pb-4">
            <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Account</p>
            <Link 
              href="/admin/profile"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all",
                pathname === '/admin/profile' && "bg-indigo-600/10 text-indigo-400"
              )}
            >
              <Settings size={20} />
              <span className="flex-1 text-sm">Settings</span>
            </Link>
          </div>
        </nav>

        {/* Logout Footer */}
        <div className="p-6 border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl relative z-20">
          <Button 
            variant="danger" 
            className="w-full rounded-xl py-3 group/logout"
            onClick={handleLogout}
            isLoading={isLoggingOut}
            leftIcon={<LogOut size={18} className="group-hover/logout:-translate-x-1 transition-transform" />}
          >
            Sign Out
          </Button>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Server Live: AWS-SIN-1
          </div>
        </div>
      </aside>
    </>
  );
}
