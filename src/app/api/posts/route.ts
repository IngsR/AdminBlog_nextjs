import { NextResponse } from 'next/server';
import { PostService } from '@/services/post.service';

const postService = new PostService();

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
    const body = await request.json();
    const { title, content, categoryId, authorId, imageUrl, isFeatured, status } = body;
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const post = await postService.createPost({
      title,
      content,
      categoryId,
      authorId,
      imageUrl,
      isFeatured,
      status
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
