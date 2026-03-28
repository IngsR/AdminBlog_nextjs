import Link from 'next/link';
import { LayoutDashboard, FileText, Tags, User } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 px-4 text-center">AdminBLog</div>
      <nav className="space-y-2 flex-grow">
        <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/posts" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <FileText size={20} />
          <span>Posts</span>
        </Link>
        <Link href="/admin/categories" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <Tags size={20} />
          <span>Categories</span>
        </Link>
        <Link href="/admin/profile" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <User size={20} />
          <span>Profile</span>
        </Link>
      </nav>
      <div className="mt-8 text-xs text-gray-500 text-center">
        Powered by Next.js & Supabase
      </div>
    </aside>
  );
}
