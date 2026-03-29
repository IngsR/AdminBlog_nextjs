import { NextResponse } from 'next/server';
import { CategoryService } from '@/services/category.service';

const categoryService = new CategoryService();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await categoryService.getCategoryById(id);
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name } = await request.json();
    const category = await categoryService.updateCategory(id, name);
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await categoryService.deleteCategory(id);
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
