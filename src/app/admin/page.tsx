import { PostService } from '@/services/post.service';
import { CategoryService } from '@/services/category.service';
import { AuthService } from '@/services/auth.service';
import { StatCard } from '@/components/molecules/StatCard';
import { FileText, Tags, Users, MousePointer2, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const postService = new PostService();
  const categoryService = new CategoryService();
  const authService = new AuthService();
  
  const [posts, categories, session] = await Promise.all([
    postService.getAllPosts(),
    categoryService.getAllCategories(),
    authService.getSession()
  ]);

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-violet-500">{session.username || 'Admin'}</span>!
          </h1>
          <p className="text-muted-foreground font-medium tracking-wide">Here's what's happening on your blog today.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-secondary/50 border border-border px-4 py-2 rounded-2xl backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">System Operational</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          label="Total Posts" 
          value={posts.length} 
          icon={FileText} 
          color="indigo" 
          trend="+4" 
          trendType="positive" 
        />
        <StatCard 
          label="Categories" 
          value={categories.length} 
          icon={Tags} 
          color="violet" 
        />
        <StatCard 
          label="Active Users" 
          value={1} 
          icon={Users} 
          color="rose" 
          trend="Single Admin" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Placeholder for Recent Activity or Chart */}
        <div className="bg-card shadow-sm border border-border rounded-[2.5rem] p-8 min-h-[300px] flex flex-col justify-center items-center text-center space-y-4 transition-colors">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center animate-bounce">
            <TrendingUp size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Analytics Engine coming soon</h3>
            <p className="text-muted-foreground max-w-xs mx-auto text-sm">We're building a world-class analytics engine to help you track your blog's growth.</p>
          </div>
        </div>

        <div className="bg-card shadow-sm border border-border rounded-[2.5rem] p-8 min-h-[300px] flex flex-col justify-center items-center text-center space-y-4 transition-colors">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <MousePointer2 size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Quick Actions</h3>
            <div className="flex gap-4 mt-6">
              <button className="bg-secondary text-foreground hover:bg-muted border border-border px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95">New Post</button>
              <button className="bg-secondary text-foreground hover:bg-muted border border-border px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
