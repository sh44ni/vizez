'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Tracker from '@/components/Tracker'
import ChatWidget from '@/components/ChatWidget'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <Tracker />
      {!isAdmin && <Navbar />}
      {isAdmin ? children : <main>{children}</main>}
      {!isAdmin && <Footer />}
      <ChatWidget />
    </>
  )
}
