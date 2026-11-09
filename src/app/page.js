import HeroSlider from "@/components/home/hero-slider";
import CategorySection from "@/components/home/category-section";
import FeaturedStudios from "@/components/home/featured-studios";
import HostGuarantee from "@/components/home/host-guarantee";
import BookingSteps from "@/components/home/booking-steps";
export default function Home() {
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <FeaturedStudios />
    </>
  );
}