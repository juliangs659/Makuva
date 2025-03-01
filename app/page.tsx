import Hero from "@/components/hero"
import FeaturedDestinations from "@/components/featured-destinations"
import HowItWorks from "@/components/how-it-works"
import { UserRoutes } from "@/components/user-routes"
import Testimonials from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedDestinations />
      <HowItWorks />
      <UserRoutes />
      <Testimonials />
      <Footer />
    </main>
  )
}

