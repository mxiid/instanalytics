import './css/style.css'

import { Inter, Architects_Daughter } from 'next/font/google'
import { getServerSession} from "next-auth";
import SessionProvider from './utils/SessionProvider'
import Header from '@/components/ui/header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: 'Home - Instanalytics',
  description: 'Home',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}>
        <SessionProvider session={session}>
      <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          {children}
        </div>
        </SessionProvider>
      </body>
    </html>
  )
}
 