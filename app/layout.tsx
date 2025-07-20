import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yana Labs Booking',
  description: 'Book your medical diagnostic appointments with Yana Labs - Professional X-ray, Ultrasound, and ECG services in Bangalore',
  generator: 'Yana Labs',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
