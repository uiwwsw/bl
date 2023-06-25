import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '발란 테스트',
  description: '윤창원',
}

// These styles apply to every route in the application
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}