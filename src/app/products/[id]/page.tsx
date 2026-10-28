import { notFound } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/supabase';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const { data } = await supabase
    .from<Product>('products')
    .select('name')
    .eq('id', params.id)
    .single();
  return { title: data?.name ?? 'Product' };
}

export default async function ProductPage({ params }: Props) {
  const { data, error } = await supabase
    .from<Product>('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/2 h-96">
        {data.image_url ? (
          <Image src={data.image_url} alt={data.name} fill className="object-cover rounded" />
        ) : (
          <div className="bg-gray-200 w-full h-full rounded" />
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-display mb-4">{data.name}</h1>
        <p className="text-lg text-gray-700 mb-4">{data.description}</p>
        <p className="text-2xl font-semibold text-gold mb-6">${data.price.toLocaleString()}</p>
        {/* Placeholder for CTA buttons */}
        <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
          Inquire
        </button>
      </div>
    </section>
  );
}
