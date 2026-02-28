import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Medi Estate Property'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Medi Estate - Premium Medical Properties
      </div>
    ),
    { ...size }
  )
}
