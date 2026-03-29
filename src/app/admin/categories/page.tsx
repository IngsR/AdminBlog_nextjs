import { CategoryService } from '@/services/category.service';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Tags, 
  Edit3, 
  Trash2, 
  Hash,
  Link2 
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { DeleteButton } from '@/components/molecules/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categoryService = new CategoryService();
  const categories = await categoryService.getAllCategories();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tight">Categories</h1>
          <p className="text-muted-foreground font-medium tracking-wide">Organize your content with taxonomy labels.</p>
        </div>
        <Link href="/admin/categories/new">
          <Button variant="premium" size="lg" leftIcon={<Plus size={20} />}>
            Add Category
          </Button>
        </Link>
      </div>

      <Card className="p-0 overflow-hidden border-border bg-card shadow-sm transition-colors duration-300">
        <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between gap-4 bg-muted/20">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full bg-input border border-border rounded-xl py-2.5 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="indigo" className="px-3 py-1 font-black uppercase tracking-widest text-[10px]">{categories.length} Total</Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">Category Name</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">Slug & ID</th>
                <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat.id} className="group hover:bg-muted/40 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-500 flex items-center justify-center border border-border/50 group-hover:bg-violet-600/20 transition-all">
                        <Tags size={18} />
                      </div>
                      <span className="text-foreground font-bold group-hover:text-indigo-500 transition-colors block leading-tight">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 align-middle">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                        <Link2 size={12} className="text-indigo-500" />
                        {cat.slug}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground/70 text-[10px] font-bold font-mono">
                        <Hash size={10} />
                        {cat.id.slice(0, 8)}...
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 pr-2">
                       <Link href={`/admin/categories/${cat.id}/edit`}>
                         <Button variant="ghost" size="icon" className="hover:text-indigo-400">
                           <Edit3 size={18} />
                         </Button>
                       </Link>
                       <DeleteButton 
                         id={cat.id} 
                         endpoint="/api/categories" 
                         itemName={cat.name} 
                       />
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-secondary border border-border mx-auto flex items-center justify-center text-muted-foreground">
                      <Tags size={32} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-bold">No categories found</h3>
                      <p className="text-muted-foreground text-sm">Organize your content by adding taxonomy labels.</p>
                    </div>
                    <Link href="/admin/categories/new" className="inline-block mt-4">
                      <Button variant="outline" size="sm">Add First Category</Button>
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
