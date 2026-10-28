"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  featured: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher('/api/products')
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto py-12 px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </section>
    );
  }

  if (error) {
    return <p className="text-red-600">Failed to load products.</p>;
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}> 
          <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
            <div className="relative w-full h-48 mb-4">
              {product.image_url ? (
                <Image src={product.image_url} alt={product.name} fill className="object-cover rounded" />
              ) : (
                <div className="bg-gray-200 w-full h-full rounded" />
              )}
            </div>
            <h2 className="text-xl font-medium mb-2">{product.name}</h2>
            <p className="text-gray-600 flex-grow">{product.description}</p>
            <p className="text-gold font-semibold mt-2">${product.price.toLocaleString()}</p>
          </Card>
        </Link>
      ))}
    </section>
  );
}
