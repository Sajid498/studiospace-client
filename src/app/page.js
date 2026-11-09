import HeroSlider from "@/components/home/hero-slider";
import CategorySection from "@/components/home/category-section";
import FeaturedStudios from "@/components/home/featured-studios";
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