import { NextResponse } from 'next/server';
import { CategoryService } from '@/services/category.service';

const categoryService = new CategoryService();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await categoryService.getCategoryById(params.id);
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name } = body;
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const category = await categoryService.updateCategory(params.id, name);
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await categoryService.deleteCategory(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
