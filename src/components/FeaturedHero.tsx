import Image from "next/image";
import Link from "next/link";

export default function FeaturedHero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background hero image */}
      <Image
        src="/hero-desktop.svg"
        alt="Featured hero"
        width={1280}
        height={640}
        className="w-full h-auto object-cover"
        priority
        unoptimized // SVG, no optimization needed
      />
      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-16 md:p-24 lg:p-32 space-y-6">
        <h1 className="text-5xl font-display text-black">
          A clearer path to opportunity.
        </h1>
        <p className="text-xl text-gray max-w-lg">
          Premium property and investment opportunities, presented with clarity and trust.
        </p>
        <div className="flex space-x-4">
          <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-base font-medium hover:bg-gray-800 transition-colors">
            Explore
          </Link>
          <Link href="/about" className="inline-flex items-center justify-center rounded-full bg-white text-black border border-black px-6 py-3 text-base font-medium hover:bg-gray-100 transition-colors">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
