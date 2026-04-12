'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, FileText, Star, Info } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { ImageUpload } from '@/components/molecules/ImageUpload';
import RichTextEditor from '@/components/molecules/RichTextEditor';
import { cn } from '@/lib/utils';

interface EditFormProps {
  post: {
    id: string;
    title: string;
    content: string;
    categoryId: string | null;
    imageUrl: string | null;
    isFeatured: boolean | null;
    status: string | null;
  };
  categories: { id: string; name: string }[];
}

export function EditForm({ post, categories }: EditFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');
  const [categoryId, setCategoryId] = useState(post.categoryId || '');
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
  const [isFeatured, setIsFeatured] = useState(post.isFeatured || false);
  const [status, setStatus] = useState(post.status || 'published');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Extra frontend validation layer
    if (!title.trim() || !content.trim()) {
      setError('Title and content are strictly required.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
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

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/admin/posts" className="inline-flex items-center gap-2 text-muted-foreground hover:text-indigo-500 transition-colors text-xs font-black uppercase tracking-widest mb-2 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Posts
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Edit <span className="text-indigo-500">Story</span></h1>
          <p className="text-muted-foreground font-medium text-sm">Update your post and save changes.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
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
                <label className="text-xs font-semibold text-muted-foreground ml-1 tracking-wider uppercase">Content (Rich Text)</label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Continue writing your story with full formatting..."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                <Badge variant="outline" className="text-[10px] py-1 border-border text-muted-foreground">
                  <Info size={10} className="mr-1" /> WYSIWYG Editor Enabled
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
          <Card variant="glass" className="p-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest border-b border-border pb-2">Publishing</h3>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">Category</label>
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">No Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest border-b border-border pb-2">Media & Visibility</h3>

              <ImageUpload
                label="Cover Image"
                value={imageUrl}
                onChange={setImageUrl}
              />

              <label className="flex items-center justify-between gap-3 cursor-pointer p-3 rounded-xl border border-border bg-input hover:border-indigo-500/50 transition-all shadow-sm">
                <div className="flex items-center gap-2">
                  <Star size={15} className={cn('transition-colors', isFeatured ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground')} />
                  <span className="text-sm font-semibold text-foreground">Featured Post</span>
                </div>
                <div
                  role="checkbox"
                  aria-checked={isFeatured}
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={cn('w-10 h-5 rounded-full relative transition-colors duration-300 shrink-0 border border-border/10', isFeatured ? 'bg-indigo-600' : 'bg-secondary')}
                >
                  <div className={cn('absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm', isFeatured ? 'left-6' : 'left-1')}></div>
                </div>
              </label>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Post ID: {post.id.slice(0, 8)}...</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
