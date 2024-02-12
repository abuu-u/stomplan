import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stоmрlаn',
  description: 'веб-приложения для стоматологических клиник',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} text-[18px] leading-[1.5]`}>
        {children}
      </body>
    </html>
  )
}
