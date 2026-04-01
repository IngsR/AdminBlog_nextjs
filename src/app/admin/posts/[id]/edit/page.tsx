import { notFound, redirect } from 'next/navigation';
import { PostService } from '@/services/post.service';
import { CategoryService } from '@/services/category.service';
import { EditForm } from '@/components/organisms/EditForm';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Authorization Logic: Verify session & admin role on the server
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  
  if (!session.isLoggedIn) {
    redirect('/login');
  }

  // Optional Role based validation example
  // if (session.role !== 'admin') {
  //   redirect('/unauthorized');
  // }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Fetch Data directly via internal services (Server Components)
  const postService = new PostService();
  const categoryService = new CategoryService();

  const [post, categories] = await Promise.all([
    postService.getPostById(id),
    categoryService.getAllCategories()
  ]);

  // 3. Data Validation: if post doesn't exist, show 404 cleanly
  if (!post) {
    notFound();
  }

  return <EditForm post={post} categories={categories} />;
}
