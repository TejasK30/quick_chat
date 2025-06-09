import Navbar from "@/components/base/Navbar"
import HeroSection from "@/components/base/HeroSection"
import FeatureSection from "@/components/base/FeatureSection"
import UserReviews from "@/components/base/UserReviews"
import Footer from "@/components/base/Footer"

export default async function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <HeroSection />

      <FeatureSection />

      <UserReviews />

      <Footer />
    </div>
  )
}
