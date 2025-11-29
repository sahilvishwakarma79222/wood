// 'use client'
// import Navbar from '@/components/Navbar'
// import Hero from '@/components/Hero'
// import Categories from '@/components/Categories'
// import Products from '@/components/Products'
// import Features from '@/components/Features'
// import CTA from '@/components/CTA'
// import Footer from '@/components/Footer'
// import AboutSection from '@/components/AboutSection'
// import MaterialsSection from '@/components/MaterialsSection'

// export default function Home() {
//   return (
//     <main>
//       <Navbar />
//       <Hero />
//       <MaterialsSection />
//       <Categories />
//       <Products />
//       <AboutSection />
//       <Features />
//       <CTA />
//       <Footer />
//     </main>
//   )
// }


'use client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Products from '@/components/Products'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AboutSection from '@/components/AboutSection'
import BestSeller from '@/components/BestSeller'
import FindTheRightFit from '@/components/FindTheRightFit'
import MaterialsSection from '@/components/MaterialsSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MaterialsSection />
      <BestSeller></BestSeller>
      <FindTheRightFit></FindTheRightFit>
      <Categories />
      <Products />
      <AboutSection />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}