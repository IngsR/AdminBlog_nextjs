import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 w-full max-w-md p-4">
        {children}
      </div>
    </div>
  );
}
