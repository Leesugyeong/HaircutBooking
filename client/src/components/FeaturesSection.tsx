import { Calendar, Scissors, MapPin, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "간편한 예약",
    description: "원하는 날짜와 시간을 선택하여 쉽고 빠르게 예약하세요"
  },
  {
    icon: Scissors,
    title: "전문 미용사 매칭",
    description: "성별, 연령대, 스타일 선호도에 맞는 미용사를 찾아드립니다"
  },
  {
    icon: DollarSign,
    title: "합리적인 가격",
    description: "대학생을 위한 특별 할인가로 부담 없이 이용하세요"
  },
  {
    icon: MapPin,
    title: "성북구 전역 서비스",
    description: "성북구 모든 동에서 편리하게 미용 서비스를 받으실 수 있습니다"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">왜 우리 서비스를 선택해야 할까요?</h2>
          <p className="text-lg text-muted-foreground">대학생을 위한 최고의 미용 경험을 제공합니다</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 hover-elevate transition-all duration-200">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
