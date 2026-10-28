'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Network response not ok');
      setStatus('sent');
      // Reset form after a short delay
      setTimeout(() => {
        setForm({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
        // Optional: redirect to thank you page
        // router.push('/thank-you');
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display mb-6">Get in Touch</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded border px-3 py-2"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded border px-3 py-2"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          className="w-full rounded border px-3 py-2"
          value={form.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your message (optional)"
          rows={4}
          className="w-full rounded border px-3 py-2"
          value={form.message}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-gold text-white px-6 py-2 rounded-full hover:bg-gold/90 transition-colors"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'sent' && (
          <p className="text-green-600">Thanks! We’ll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">Oops! Something went wrong.</p>
        )}
      </form>
    </section>
  );
}
