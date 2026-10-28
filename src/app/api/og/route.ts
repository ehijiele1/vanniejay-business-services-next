import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'VannieJay Property';
  const price = searchParams.get('price') ?? '';

  const html = `
    <div style="
      width:1200px;
      height:630px;
      background:#fff;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      color:#111;
      font-size:64px;
      font-family:Inter;
      font-weight:500;
    ">
      <div>${title}</div>
      ${price ? `<div style="margin-top:20px;font-size:48px;color:#C8A24A;">${price}</div>` : ''}
    </div>
  `;

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
}
