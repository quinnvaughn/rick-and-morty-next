import type { Metadata } from 'next'
import './globals.css'
import { SearchProvider } from '@/context/search'

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Practicing Next.js 15 with Rick and Morty API',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  )
}
