import React from 'react';

export function Skeleton({
  className = '',
  width = '100%',
  height = '1rem',
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      style={{ width, height }}
    />
  );
}
