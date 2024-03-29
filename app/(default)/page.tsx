require('dotenv').config();
export const metadata = {
  title: 'Instanalytics',
  description: 'Landing page',
}

import Hero from '@/components/hero'
import Features from '@/components/features'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  )
}
