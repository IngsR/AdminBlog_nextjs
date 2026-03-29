'use client';

import { useState } from 'react';
import Sidebar from '@/components/organisms/Sidebar';
import Navbar from '@/components/organisms/Navbar';
import { ThemeProvider } from '@/lib/ThemeContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Mobile Navbar with Burger Toggle */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Sidebar Navigation - Handles off-canvas on mobile */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Admin Content Area */}
        <main className="flex-1 w-full min-h-screen overflow-x-hidden relative flex flex-col pt-14 lg:pt-0">
          {/* Top Header Background Glow */}
          <div className="absolute top-0 left-0 w-full h-80 bg-linear-to-b from-indigo-600/10 via-indigo-600/5 to-transparent pointer-events-none"></div>

          {/* Child Content Wrapper */}
          <div className="flex-1 p-4 md:p-8 lg:p-10 relative z-10 lg:max-w-7xl lg:mx-auto lg:w-full">
            {children}
          </div>

          {/* Footer Polish */}
          <footer className="p-6 border-t border-border text-center relative z-10 transition-colors duration-300">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-1">Admin Blog Engine</p>
            <p className="text-[9px] text-muted-foreground tracking-wider">&copy; 2026 Ings. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}
