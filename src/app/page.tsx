import { Button } from '@/components/atoms/Button';
import { ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col relative overflow-hidden bg-grid">
            {/* Background decoration blur */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[160px] animate-pulse"></div>
            <div
                className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[160px] animate-pulse"
                style={{ animationDelay: '3s' }}
            ></div>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
                <div className="max-w-4xl text-center space-y-12">
                    {/* Badge */}
                    <div className="space-y-6 animate-in fade-in zoom-in duration-700">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                            Manage your blog <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
                                with lightning speed.
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            AdminBLog is a premium management portal built for
                            velocity. Powered by Next.js, Supabase, and Drizzle
                            ORM for ultimate control.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        <Link href="/login">
                            <Button
                                size="lg"
                                variant="premium"
                                className="h-16 px-10 rounded-2xl text-lg font-black group transition-all duration-500"
                            >
                                Enter Admin Portal
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">
                            Vitesse Engine
                        </h3>
                        <p className="text-zinc-500">
                            Supercharged CRUD operations with Drizzle ORM and
                            Postgres performance.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Atomic UI</h3>
                        <p className="text-zinc-500">
                            Beautiful, reusable, and accessible design system
                            built from the ground up.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-400/20 text-zinc-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Iron Auth</h3>
                        <p className="text-zinc-500">
                            Military-grade session security with iron-session
                            and bcrypt hashing.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-8 text-center text-zinc-600 text-sm font-medium relative z-10">
                &copy; {new Date().getFullYear()} AdminBLog Premium Portal. All
                rights reserved.
            </footer>
        </div>
    );
}
