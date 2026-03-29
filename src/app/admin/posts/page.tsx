import { PostService } from '@/services/post.service';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  FileText
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { DeleteButton } from '@/components/molecules/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const postService = new PostService();
  const posts = await postService.getAllPosts();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tight">Posts</h1>
          <p className="text-zinc-500 font-medium tracking-wide">Manage and publish your blog content.</p>
        </div>
        <Link href="/admin/posts/new">
          <Button variant="premium" size="lg" leftIcon={<Plus size={20} />}>
            Create New Post
          </Button>
        </Link>
      </div>

      <Card variant="glass" className="p-0 overflow-hidden border-white/5 shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4 bg-white/5">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="w-full bg-zinc-950/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="rounded-lg text-[10px] uppercase tracking-widest font-black">Latest</Button>
            <Button variant="ghost" size="sm" className="rounded-lg text-[10px] uppercase tracking-widest font-black">Drafts</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50">
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-white/5">Title & Info</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-white/5">Status</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-white/5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="group hover:bg-white/2 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-white/10 group-hover:scale-110 transition-transform duration-500" alt="" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/5">
                          <FileText size={20} className="text-zinc-600" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Link href={`/admin/posts/${post.id}/edit`} className="text-white font-bold hover:text-indigo-400 transition-colors block leading-tight">
                          {post.title}
                        </Link>
                        <div className="flex items-center gap-4 text-[11px] font-medium text-zinc-500">
                          <span className="flex items-center gap-1.5 leading-none bg-white/5 px-2 py-1 rounded-md">
                            <Calendar size={12} className="text-indigo-500" />
                            {new Date(post.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          {post.isFeatured && (
                            <Badge variant="indigo" className="text-[9px] py-0.5 border-indigo-500/30">FEATURED</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 align-middle">
                    <Badge variant={post.status === 'published' ? 'success' : 'warning'}>
                      {post.status?.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 pr-2">
                       <Link href={`/admin/posts/${post.id}/edit`}>
                         <Button variant="ghost" size="icon" className="hover:text-indigo-400">
                           <Edit3 size={18} />
                         </Button>
                       </Link>
                       <DeleteButton 
                         id={post.id} 
                         endpoint="/api/posts" 
                         itemName={post.title} 
                       />
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-white/5 mx-auto flex items-center justify-center text-zinc-700">
                      <FileText size={32} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">No posts found</h3>
                      <p className="text-zinc-500 text-sm">Get started by creating your very first blog post.</p>
                    </div>
                    <Link href="/admin/posts/new" className="inline-block mt-4">
                      <Button variant="outline" size="sm">Create First Post</Button>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
