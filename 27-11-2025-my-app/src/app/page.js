'use client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Products from '@/components/Products'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <AboutSection />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}