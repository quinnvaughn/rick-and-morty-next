import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
