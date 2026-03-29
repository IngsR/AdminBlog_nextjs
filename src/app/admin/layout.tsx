'use client';

import { useState } from 'react';
import Sidebar from '@/components/organisms/Sidebar';
import Navbar from '@/components/organisms/Navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Mobile Navbar with Burger Toggle */}
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Sidebar Navigation - Handles off-canvas on mobile */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      {/* Main Admin Content Area */}
      <main className="flex-1 w-full min-h-screen overflow-x-hidden relative flex flex-col pt-16 lg:pt-0">
        {/* Top Header Background Glow */}
        <div className="absolute top-0 left-0 w-full h-80 bg-linear-to-b from-indigo-600/10 via-indigo-600/5 to-transparent pointer-events-none"></div>
        
        {/* Child Content Wrapper */}
        <div className="flex-1 p-6 md:p-10 relative z-10 lg:max-w-7xl lg:mx-auto lg:w-full animate-in fade-in slide-in-from-right-4 duration-500">
          {children}
        </div>

        {/* Footer Polish */}
        <footer className="p-8 border-t border-white/5 text-center relative z-10">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] mb-1">Admin Blog Engine</p>
          <p className="text-[9px] text-zinc-700 tracking-wider">&copy; 2026 Ings. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
