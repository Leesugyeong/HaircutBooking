import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Phone, School, Mail, MapPin, DollarSign, Users, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timeSlots = Array.from({ length: 23 }, (_, i) => {
  const hour = Math.floor(9 + i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

const locations = [
  "정릉1동", "정릉2동", "정릉3동", "정릉4동",
  "길음1동", "길음2동", "종암동",
  "월곡1동", "월곡2동",
  "장위1동", "장위2동", "장위3동",
  "석관동", "안암동", "보문동", "삼선동", "동선동"
];

const priceRanges = [
  "~20,000원",
  "20,000-30,000원",
  "30,000-40,000원",
  "40,000원+"
];

const bookingSchema = z.object({
  date: z.string().min(1, "예약 날짜를 선택해주세요"),
  time: z.string().min(1, "시간대를 선택해주세요"),
  name: z.string().min(2, "이름을 입력해주세요"),
  phone: z.string().min(10, "전화번호를 입력해주세요"),
  school: z.string().min(2, "학교명을 입력해주세요"),
  studentId: z.string().min(1, "학번을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  location: z.string().min(1, "위치를 선택해주세요"),
  priceRange: z.string().min(1, "가격대를 선택해주세요"),
  stylistGender: z.string().min(1, "미용사 성별을 선택해주세요"),
  stylistAge: z.string().min(1, "미용사 연령대를 선택해주세요"),
  desiredStyle: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: "",
      time: "",
      name: "",
      phone: "",
      school: "",
      studentId: "",
      email: "",
      location: "",
      priceRange: "",
      stylistGender: "",
      stylistAge: "",
      desiredStyle: "",
      additionalNotes: "",
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "예약 신청 완료",
        description: "예약 신청이 성공적으로 접수되었습니다.",
      });
      form.reset();
      setSelectedFile(null);
    },
    onError: (error) => {
      toast({
        title: "예약 신청 실패",
        description: error instanceof Error ? error.message : "예약 신청 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    createBookingMutation.mutate(data);
  };

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">미용실 예약 신청</h2>
          <p className="text-lg text-muted-foreground">아래 정보를 입력하고 예약을 신청해주세요</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">예약 정보</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          예약 날짜
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          시간대
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-time">
                              <SelectValue placeholder="시간을 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          전화번호
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="010-1234-5678" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <School className="w-4 h-4" />
                          학교
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="○○대학교" {...field} data-testid="input-school" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>학번</FormLabel>
                        <FormControl>
                          <Input placeholder="20241234" {...field} data-testid="input-studentid" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          이메일
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="student@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t-2 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">요구사항</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>위치 (성북구)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-location">
                              <SelectValue placeholder="동을 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>
                                {loc}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          가격대
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-price">
                              <SelectValue placeholder="가격대를 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {priceRanges.map((price) => (
                              <SelectItem key={price} value={price}>
                                {price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stylistGender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          미용사 성별
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-gender">
                              <SelectValue placeholder="성별을 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="무관">무관</SelectItem>
                            <SelectItem value="남성">남성</SelectItem>
                            <SelectItem value="여성">여성</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stylistAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>미용사 연령대</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-age">
                              <SelectValue placeholder="연령대를 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="무관">무관</SelectItem>
                            <SelectItem value="20대">20대</SelectItem>
                            <SelectItem value="30대">30대</SelectItem>
                            <SelectItem value="40대+">40대+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="desiredStyle"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>원하는 스타일</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="원하는 헤어 스타일을 자세히 설명해주세요" 
                            rows={3}
                            {...field} 
                            data-testid="textarea-style"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>기타 요청사항</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="추가로 전달하고 싶은 내용이 있다면 입력해주세요" 
                            rows={4}
                            {...field} 
                            data-testid="textarea-notes"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">참고 이미지 업로드 (선택사항)</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover-elevate transition-all">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="file-upload"
                        data-testid="input-file"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-primary font-medium">파일 선택</span>
                        <span className="text-muted-foreground"> 또는 드래그 앤 드롭</span>
                      </label>
                      {selectedFile && (
                        <p className="mt-2 text-sm text-foreground">선택된 파일: {selectedFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto px-12 py-6 text-lg"
                  disabled={createBookingMutation.isPending}
                  data-testid="button-submit"
                >
                  {createBookingMutation.isPending ? "제출 중..." : "예약 신청하기"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
