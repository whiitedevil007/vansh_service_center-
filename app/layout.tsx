import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vansh Service Center - Professional Home Appliance Repair Services',
  description: 'Expert appliance repair services for refrigerators, washing machines, AC, microwave, TV, and more. Same-day doorstep service with certified technicians and genuine parts.',
  keywords: 'appliance repair, refrigerator repair, washing machine repair, AC repair, microwave repair, TV repair, home service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}