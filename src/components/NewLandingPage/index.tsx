import Hero from './Hero'
import Features from './Features'
import FeaturesBlocks from './FeaturesBlocks'
import Testimonials from './Testimonials'
import Newsletter from './Connect'
import Header from './Header'
import Footer from './Footer'


export default function NewLandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Header />
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}