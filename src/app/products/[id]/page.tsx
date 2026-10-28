"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/supabase';

export default function ProductDetail({ params }: any) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();
      if (error) {
        setError(error.message);
        return;
      }
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/2 h-96">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.name} fill className="object-cover rounded" />
        ) : (
          <div className="bg-gray-200 w-full h-full rounded" />
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-display mb-4">{product.name}</h1>
        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-gold mb-6">${product.price.toLocaleString()}</p>
        <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
          Inquire
        </button>
      </div>
    </section>
  );
}
