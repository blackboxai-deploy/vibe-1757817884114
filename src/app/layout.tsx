import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FLOUNDER - Remote Development Environment',
  description: 'Desktop app with mobile QR control for remote development access',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-red-600 text-white p-2 text-center font-bold text-sm">
          WARNING: PERSONAL DEVICES ONLY - UNAUTHORIZED USE IS ILLEGAL
        </div>
        <div className="min-h-screen bg-black text-green-400">
          {children}
        </div>
      </body>
    </html>
  )
}