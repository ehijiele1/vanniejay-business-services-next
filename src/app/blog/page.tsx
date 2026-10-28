import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface PostMeta {
  title: string;
  date: string;
  slug: string;
}

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), 'src', 'content', 'blog');
  const filenames = fs.readdirSync(postsDir);
  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    return { slug, title: data.title ?? slug, date: data.date ?? '' };
  });

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-display mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`} className="text-2xl font-medium hover:underline">
              {post.title}
            </Link>
            {post.date && <p className="text-gray-500 text-sm">{post.date}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
