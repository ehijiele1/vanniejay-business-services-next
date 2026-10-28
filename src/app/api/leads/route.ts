import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Lead } from '@/types/supabase';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { name, email, phone, message } = payload;
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('leads')
      .insert({ name, email, phone, message })
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // TODO: Add optional webhook/notification here.
    return NextResponse.json({ success: true, lead: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
