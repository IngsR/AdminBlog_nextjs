'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Eye, 
  Sparkles,
  Info,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState('published');
  
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catRes = await fetch('/api/categories');
        const catData = await catRes.json();
        if (Array.isArray(catData)) setCategories(catData);

        // Fetch post
        const postRes = await fetch(`/api/posts/${id}`);
        const postData = await postRes.json();
        
        if (postData.error) throw new Error(postData.error);
        
        setTitle(postData.title || '');
        setContent(postData.content || '');
        setCategoryId(postData.categoryId || '');
        setImageUrl(postData.imageUrl || '');
        setIsFeatured(postData.isFeatured || false);
        setStatus(postData.status || 'published');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, content, categoryId: categoryId || null, imageUrl, isFeatured, status
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin/posts" className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors text-xs font-black uppercase tracking-widest mb-2 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Posts
          </Link>
          <h1 className="text-4xl font-black text-white tracking-tight">Edit <span className="text-indigo-500">Story</span></h1>
          <p className="text-zinc-500 font-medium">Refine your content and keep your readers engaged.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <Input
                label="Post Title"
                placeholder="Enter a captivating title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="text-lg font-bold"
                leftIcon={<FileText size={18} />}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 ml-1 tracking-wider uppercase">Content (Markdown)</label>
                <div className="relative group">
                   <textarea 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    required 
                    rows={15} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white placeholder-zinc-500 focus:bg-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-mono text-sm leading-relaxed resize-none" 
                    placeholder="Start writing your story in markdown..." 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-8">
                <Badge variant="outline" className="text-[10px] py-1 border-white/10 text-zinc-500">
                  <Info size={10} className="mr-1" /> Markdown Supported
                </Badge>
                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  isLoading={isLoading}
                  leftIcon={<Save size={18} />}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card variant="glass" className="p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">Publishing</h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider ml-1">Status</label>
                <select 
                  value={status} 
                  onChange={e => setStatus(e.target.value)} 
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 outline-none appearance-none cursor-pointer hover:bg-zinc-900 transition-colors"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider ml-1">Category</label>
                <select 
                  value={categoryId} 
                  onChange={e => setCategoryId(e.target.value)} 
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 outline-none appearance-none cursor-pointer hover:bg-zinc-900 transition-colors"
                >
                  <option value="">No Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">Media & Visibility</h3>
              
              <Input
                label="Cover Image"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                leftIcon={<ImageIcon size={18} />}
              />

              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 group hover:border-indigo-500/30 transition-all cursor-pointer" onClick={() => setIsFeatured(!isFeatured)}>
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg transition-colors", isFeatured ? "bg-indigo-500/20 text-indigo-400" : "bg-zinc-800 text-zinc-500")}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">Featured Post</p>
                    <p className="text-[10px] text-zinc-500 mt-1">Showcase on homepage</p>
                  </div>
                </div>
                <div className={cn(
                  "w-10 h-5 rounded-full relative transition-colors duration-300",
                  isFeatured ? "bg-indigo-600" : "bg-zinc-800"
                )}>
                  <div className={cn(
                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300",
                    isFeatured ? "left-6" : "left-1"
                  )}></div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Post ID: {id.slice(0, 8)}...</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
