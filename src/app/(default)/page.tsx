import Header from "@/components/NewLandingPage/Header"
import Hero from "@/components/NewLandingPage/Hero"
import Features from "@/components/NewLandingPage/Features"
import FeaturesBlocks from "@/components/NewLandingPage/FeaturesBlocks"
import Testimonials from "@/components/NewLandingPage/Testimonials"
import Connect from "@/components/NewLandingPage/Connect"
import Footer from "@/components/NewLandingPage/Footer"

export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Connect />
      <Footer />
    </>
  )
}
