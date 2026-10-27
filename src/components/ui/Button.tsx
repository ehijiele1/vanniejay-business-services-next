import React from 'react';

export function Button({
  children,
  className = '',
  onClick,
  type = 'button',
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md bg-gold text-white px-5 py-2.5 text-sm font-medium hover:bg-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold ${className}`}
    >
      {children}
    </button>
  );
}
