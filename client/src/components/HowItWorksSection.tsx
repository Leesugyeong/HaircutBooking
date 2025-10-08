import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "예약 정보 입력",
    description: "원하는 날짜, 시간, 학생 정보를 입력하세요"
  },
  {
    number: "2",
    title: "미용사 매칭",
    description: "요구사항에 맞는 최적의 미용사를 매칭해드립니다"
  },
  {
    number: "3",
    title: "서비스 완료",
    description: "전문적인 스타일링을 받고 만족스러운 결과를 얻으세요"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">이용 방법</h2>
          <p className="text-lg text-muted-foreground">3단계로 간편하게 예약하세요</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-8">
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block w-8 h-8 text-primary flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
