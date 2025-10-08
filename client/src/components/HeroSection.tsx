import { Button } from "@/components/ui/button";

export default function HeroSection({ onBookingClick }: { onBookingClick?: () => void }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary/70">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920')] bg-cover bg-center opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          성북구 대학생을 위한<br />프리미엄 미용실 예약
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 drop-shadow">
          합리적인 가격으로 전문 스타일링을 경험하세요
        </p>
        
        <Button 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-xl"
          onClick={onBookingClick}
          data-testid="button-hero-booking"
        >
          지금 예약하기
        </Button>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>10,000+ 예약</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>전문 미용사</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>학생 할인</span>
          </div>
        </div>
      </div>
    </section>
  );
}
