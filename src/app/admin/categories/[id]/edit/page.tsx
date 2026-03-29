'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Tags, Hash, Loader2 } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/atoms/Card';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.name) setName(data.name);
        if (data.error) throw new Error(data.error);
      })
      .catch(err => setError(err.message))
      .finally(() => setIsFetching(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update category');
      }

      router.push('/admin/categories');
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
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <Link href="/admin/categories" className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors text-xs font-black uppercase tracking-widest mb-2 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </Link>
        <h1 className="text-4xl font-black text-white tracking-tight">Edit <span className="text-violet-500">Category</span></h1>
        <p className="text-zinc-500 font-medium tracking-wide">Refine your content structure by updating category details.</p>
      </header>

      <Card variant="glass" className="p-8">
        {error && (
          <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl text-sm font-medium mb-6 animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input 
            label="Category Name"
            placeholder="e.g. Technology, Lifestyle, Design"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-lg font-bold"
            leftIcon={<Tags size={18} />}
          />

          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between group overflow-hidden relative">
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-500 group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-all">
                <Hash size={16} />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 leading-none font-black uppercase tracking-widest">Internal Category ID</p>
                <p className="text-xs text-zinc-500 font-mono mt-1.5">{id}</p>
              </div>
            </div>
            
            {/* Background glow decoration */}
            <div className="absolute right-0 top-0 w-24 h-full bg-violet-600/5 blur-2xl group-hover:bg-violet-600/10 transition-colors"></div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
            <Link href="/admin/categories">
              <Button variant="ghost" type="button">Cancel</Button>
            </Link>
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
  );
}
