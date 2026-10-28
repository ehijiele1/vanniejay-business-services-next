import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src', 'content', 'blog');
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((filename) => ({ slug: filename.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) return { title: 'Post not found' };
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  return { title: data.title ?? slug };
}

export default async function BlogPost({ params }: any) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);
  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <ReactMarkdown className="prose dark:prose-invert">{content}</ReactMarkdown>
    </article>
  );
}
