export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">성북구 대학생 미용실 예약</h3>
            <p className="text-background/80">
              합리적인 가격으로 전문 스타일링을 경험하세요
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">서비스 시간</h3>
            <p className="text-background/80">
              평일: 09:00 - 20:00<br />
              주말: 10:00 - 18:00
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">문의</h3>
            <p className="text-background/80">
              이메일: info@seongbuk-salon.kr<br />
              전화: 02-1234-5678
            </p>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>© 2024 성북구 대학생 미용실 예약 서비스. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
