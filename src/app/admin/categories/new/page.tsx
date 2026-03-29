'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Tags, Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/atoms/Card';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create category');
      }

      router.push('/admin/categories');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <Link href="/admin/categories" className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors text-xs font-black uppercase tracking-widest mb-2 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </Link>
        <h1 className="text-4xl font-black text-white tracking-tight">Create <span className="text-violet-500">Taxonomy</span></h1>
        <p className="text-zinc-500 font-medium tracking-wide">Define a new category to better organize your content.</p>
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

          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex gap-3 items-start">
            <Sparkles size={16} className="text-violet-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase tracking-widest">Auto-Slug Generation</p>
              <p className="text-xs text-zinc-500">We'll automatically generate a URL-friendly slug based on your category name.</p>
            </div>
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
              Add Category
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
