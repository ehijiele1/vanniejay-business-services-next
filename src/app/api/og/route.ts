import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'VannieJay Property';
  const price = searchParams.get('price') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#111',
          fontSize: 64,
          fontFamily: 'Inter',
          fontWeight: 500,
        }}
      >
        <div>{title}</div>
        {price && (
          <div style={{ marginTop: 20, fontSize: 48, color: '#C8A24A' }}>{price}</div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
