export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  featured: boolean;
  created_at?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  created_at?: string;
}

export interface AutomationLog {
  id: string;
  platform: string; // e.g., "facebook", "instagram"
  payload: any;
  status: 'draft' | 'queued' | 'publishing' | 'success' | 'failed';
  created_at?: string;
}

export interface PostQueue {
  id: string;
  content: string;
  platform: string;
  status: 'draft' | 'queued' | 'publishing' | 'success' | 'failed';
  scheduled_at?: string;
  created_at?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string; // markdown content
  published_at?: string;
}
