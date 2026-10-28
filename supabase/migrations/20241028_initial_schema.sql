-- 2024‑10‑28: Initial schema for VannieJay Business Services
-- Run this file with Supabase SQL editor or via supabase migration CLI.

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  image_url text,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text,
  created_at timestamp with time zone default now()
);

create table public.automation_logs (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  payload jsonb,
  status text check (status in ('draft','queued','publishing','success','failed')),
  created_at timestamp with time zone default now()
);

create table public.post_queue (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  platform text not null,
  status text check (status in ('draft','queued','publishing','success','failed')),
  scheduled_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

create table public.featured_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  link text,
  created_at timestamp with time zone default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text not null,
  published_at timestamp with time zone default now()
);
