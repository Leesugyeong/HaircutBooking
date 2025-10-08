import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <HeroSection onBookingClick={scrollToBooking} />
      <FeaturesSection />
      <HowItWorksSection />
      <div ref={bookingRef}>
        <BookingForm />
      </div>
      <Footer />
    </div>
  );
}
