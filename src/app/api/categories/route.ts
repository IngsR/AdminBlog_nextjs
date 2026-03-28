import { NextResponse } from 'next/server';
import { CategoryService } from '@/services/category.service';

const categoryService = new CategoryService();

export async function GET() {
  try {
    const categories = await categoryService.getAllCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const category = await categoryService.createCategory(name);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
