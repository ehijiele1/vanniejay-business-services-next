import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/supabase';

export async function GET() {
  const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { slug, title, content } = payload;
    if (!slug || !title || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({ slug, title, content })
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
