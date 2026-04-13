import { NextResponse } from 'next/server';
import { PostService } from '@/services/post.service';
import { AuthService } from '@/services/auth.service';

const postService = new PostService();
const authService = new AuthService();

export async function GET() {
  try {
    const posts = await postService.getAllPosts();
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await authService.getSession();
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, categoryId, imageUrl, isFeatured, status } = body;
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const post = await postService.createPost({
      title,
      content,
      categoryId,
      authorId: session.userId,
      imageUrl,
      isFeatured,
      status
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
