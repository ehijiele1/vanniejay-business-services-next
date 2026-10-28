'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/supabase';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminPage() {
  const { data: posts, error, mutate } = useSWR<BlogPost[]>('/api/blog', fetcher);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ slug: '', title: '', content: '' });

  useEffect(() => {
    if (editing) {
      setForm({ slug: editing.slug, title: editing.title, content: editing.content });
    } else {
      setForm({ slug: '', title: '', content: '' });
    }
  }, [editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/blog?slug=${form.slug}` : '/api/blog';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      mutate();
      setEditing(null);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog?slug=${slug}`, { method: 'DELETE' });
    mutate();
  };

  if (error) return <p className="text-red-600">Failed to load posts.</p>;

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-display mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Card key={post.slug} className="p-4 flex flex-col justify-between">
            <h2 className="font-medium text-lg mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-4">/{post.slug}</p>
            <div className="mt-auto flex space-x-2">
              <Button onClick={() => setEditing(post)}>Edit</Button>
              <Button onClick={() => deletePost(post.slug)}>Delete</Button>
            </div>
          </Card>
        ))}
        <Card className="p-4 flex flex-col justify-between">
          <h2 className="font-medium text-lg mb-2">Create New Post</h2>
          <Button onClick={() => setEditing(null)}>New</Button>
        </Card>
      </div>

      {/* Edit / Create form */}
      {(editing !== null || posts?.length === 0) && (
        <div className="mt-8 border rounded p-6">
          <h2 className="text-2xl font-display mb-4">
            {editing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="slug"
              placeholder="Slug (e.g., my-first-post)"
              className="w-full border rounded px-3 py-2"
              value={form.slug}
              onChange={handleChange}
              disabled={!!editing}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full border rounded px-3 py-2"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="content"
              rows={8}
              placeholder="Markdown content"
              className="w-full border rounded px-3 py-2"
              value={form.content}
              onChange={handleChange}
              required
            />
            <Button onClick={savePost}>{editing ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      )}
    </section>
  );
}
