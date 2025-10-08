import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return <HeroSection onBookingClick={() => console.log('Booking clicked')} />;
}
