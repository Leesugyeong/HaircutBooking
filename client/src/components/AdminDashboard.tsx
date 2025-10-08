import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LogOut, Calendar, User, Phone, School, MapPin } from "lucide-react";

const mockBookings = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:00",
    name: "김철수",
    phone: "010-1234-5678",
    school: "서울대학교",
    studentId: "20241001",
    email: "kim@example.com",
    location: "안암동",
    priceRange: "20,000-30,000원",
    stylistGender: "무관",
    stylistAge: "30대",
    desiredStyle: "단정한 스타일로 부탁드립니다",
    status: "대기중"
  },
  {
    id: 2,
    date: "2024-01-16",
    time: "10:30",
    name: "이영희",
    phone: "010-9876-5432",
    school: "고려대학교",
    studentId: "20231234",
    email: "lee@example.com",
    location: "정릉1동",
    priceRange: "30,000-40,000원",
    stylistGender: "여성",
    stylistAge: "20대",
    desiredStyle: "레이어드 컷",
    status: "확정"
  },
];

export default function AdminDashboard({ onLogout }: { onLogout?: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">관리자 대시보드</h1>
            <p className="text-sm text-muted-foreground">예약 관리 시스템</p>
          </div>
          <Button variant="outline" onClick={onLogout} data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">예약 목록</h2>
          <p className="text-muted-foreground">총 {mockBookings.length}건의 예약</p>
        </div>

        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground" data-testid={`text-booking-name-${booking.id}`}>
                          {booking.name}
                        </h3>
                        <Badge 
                          variant={booking.status === "확정" ? "default" : "secondary"}
                          data-testid={`badge-status-${booking.id}`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span data-testid={`text-booking-datetime-${booking.id}`}>
                          {booking.date} {booking.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <School className="w-4 h-4" />
                      <span>{booking.school} ({booking.studentId})</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{booking.stylistGender} / {booking.stylistAge}</span>
                    </div>
                  </div>

                  {booking.desiredStyle && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-medium text-foreground mb-1">원하는 스타일</p>
                      <p className="text-sm text-muted-foreground">{booking.desiredStyle}</p>
                    </div>
                  )}
                </div>

                <div className="flex lg:flex-col gap-2">
                  <Button size="sm" variant="outline" data-testid={`button-detail-${booking.id}`}>
                    상세보기
                  </Button>
                  <Button size="sm" data-testid={`button-status-${booking.id}`}>
                    상태변경
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
