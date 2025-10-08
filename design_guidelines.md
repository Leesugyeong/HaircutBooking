# Design Guidelines: 성북구 대학생 미용실 예약 서비스

## Design Approach

**Selected Approach:** Hybrid - Modern Material Design principles with inspiration from successful booking platforms (StyleSeat, Fresha, Naver Booking)

**Rationale:** This service combines utility (efficient booking process) with trust-building (professional appearance for a beauty service). The design must be clean, approachable for university students, and instill confidence in the service quality.

**Key Design Principles:**
- Clarity and efficiency in the booking flow
- Welcoming, modern aesthetic that appeals to university students
- Trust-building through professional presentation
- Mobile-first approach (students primarily use mobile devices)

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Light Mode: 330 75% 55% (Warm rose/pink - professional yet friendly for beauty services)
- Dark Mode: 330 60% 40%

**Secondary Colors:**
- Light Mode: 220 15% 25% (Deep slate for text and important UI elements)
- Dark Mode: 220 15% 85%

**Background:**
- Light Mode: 0 0% 98% (Soft off-white)
- Dark Mode: 220 15% 10%

**Accent (use sparingly):**
- Light Mode: 280 60% 60% (Soft purple for interactive elements)
- Dark Mode: 280 50% 55%

**Functional Colors:**
- Success: 145 65% 45%
- Warning: 40 95% 55%
- Error: 0 70% 55%

### B. Typography

**Font Families:**
- Primary: 'Noto Sans KR' (Google Fonts) - Excellent Korean character support
- Accent/Headers: 'Pretendard' (via CDN) - Modern Korean font with great readability

**Type Scale:**
- Hero/H1: text-5xl md:text-6xl, font-bold
- H2: text-3xl md:text-4xl, font-semibold
- H3: text-2xl md:text-3xl, font-semibold
- Body Large: text-lg, font-normal
- Body: text-base, font-normal
- Small: text-sm, font-normal
- Labels: text-sm, font-medium

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (within components): 2, 4
- Component spacing: 6, 8
- Section spacing: 12, 16, 20, 24

**Grid System:**
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Form layouts: max-w-4xl for optimal readability
- Admin dashboard: max-w-full with appropriate padding

**Responsive Breakpoints:**
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (consider 2-column for forms)
- Desktop: > 1024px (optimized layouts)

---

## Component Library

### Landing Page Structure

**1. Hero Section (80vh minimum)**
- Background: Gradient overlay (from primary color at 70% opacity to transparent) over a hero image
- Hero Image: Professional beauty salon interior or stylish haircut result - modern, clean, well-lit
- Content: Centered, z-10 above overlay
  - Main headline: "성북구 대학생을 위한 프리미엄 미용실 예약" (large, bold, white text with subtle text-shadow)
  - Subheadline: "합리적인 가격으로 전문 스타일링을 경험하세요" (medium size, white/light text)
  - CTA Button: Large, prominent button "지금 예약하기" (solid primary color, white text, with subtle shadow)
  - Trust indicators: Small badges/text showing "10,000+ 예약", "전문 미용사", "학생 할인" with icons

**2. Features Section (py-20)**
- 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Feature cards with:
  - Icon (Material Icons via CDN - Scissors, Calendar, Person, LocationOn)
  - Title (text-xl font-semibold)
  - Description (text-base text-gray-600)
- Each card: Rounded corners (rounded-xl), subtle shadow, padding p-8, background white/dark-mode-card
- Features: "간편한 예약", "전문 미용사 매칭", "합리적인 가격", "성북구 전역 서비스"

**3. How It Works Section (py-20, bg-gray-50 in light mode)**
- Numbered step cards in horizontal layout (3 steps)
- Each step: Large number badge, title, description, connecting arrow (except last)
- Steps: "1. 예약 정보 입력" → "2. 미용사 매칭" → "3. 서비스 완료"

**4. Booking Form Section (py-24)**
- Prominent section with form as centerpiece
- Two-column layout on desktop for form sections
- Form styling detailed below

**5. Footer (py-12, bg-gray-900 text-white)**
- Contact information, service hours, social links
- Copyright and terms links

### Booking Form Design

**Container:**
- Max-width: max-w-4xl
- Background: White card with shadow-xl, rounded-2xl
- Padding: p-8 md:p-12

**Form Sections:**

**Section 1: 예약 정보 (Booking Information)**
- Section header with icon and title
- Grid layout: grid-cols-1 md:grid-cols-2 gap-6
- Fields:
  - Date picker (calendar icon, date input with Korean locale)
  - Time select (dropdown, 9:00-20:00 in 30min intervals)
  - Name, Phone (single column width on mobile, half on desktop)
  - School, Student ID (same grid pattern)
  - Email (full width)

**Section 2: 요구사항 (Requirements)**
- Section header with divider (border-t-2 mt-12 pt-8)
- Grid layout: grid-cols-1 md:grid-cols-2 gap-6
- Combo boxes (select dropdowns):
  - Location: 성북구 행정동 (정릉1동, 정릉2동, 정릉3동, 정릉4동, 길음1동, 길음2동, 종암동, 월곡1동, 월곡2동, 장위1동, 장위2동, 장위3동, 석관동, 안암동, 보문동, 삼선동, 동선동)
  - Price range: ~20,000원, 20,000-30,000원, 30,000-40,000원, 40,000원+
  - Stylist gender: 무관, 남성, 여성
  - Stylist age: 무관, 20대, 30대, 40대+
- Full-width fields:
  - Desired style (textarea, rows-3)
  - Additional notes (textarea, rows-4)
- Photo upload:
  - Drag-and-drop zone with dashed border
  - Upload icon and text "참고 이미지 업로드 (선택사항)"
  - Preview thumbnails for uploaded images

**Submit Button:**
- Full width on mobile, centered max-w-xs on desktop
- Large size (py-4 px-8)
- Primary color background
- Loading state with spinner
- "예약 신청하기" text

**Input Styling:**
- Border: border-2 border-gray-300 focus:border-primary
- Rounded: rounded-lg
- Padding: px-4 py-3
- Font size: text-base
- Transition: smooth focus transitions
- Dark mode: border-gray-600 bg-gray-800

### Admin Dashboard

**Login Page:**
- Centered card (max-w-md)
- Logo/branding at top
- Simple form with username and password
- Professional appearance with minimal decoration
- Session-based authentication

**Dashboard Layout:**
- Sidebar navigation (if expanded in future)
- Top header with logout button and admin identifier
- Main content area: max-w-7xl

**Bookings Table:**
- Clean, striped table design (even rows with subtle background)
- Responsive: Card layout on mobile, table on desktop
- Columns: 예약일시, 이름, 연락처, 학교, 요구사항 요약, 상태, 액션
- Sortable columns
- Status badges: 대기중 (yellow), 확정 (green), 완료 (blue), 취소 (red)
- Action buttons: 상세보기, 상태변경
- Pagination at bottom

**Detail Modal:**
- Overlay modal with all booking details
- Organized in sections matching the form
- Uploaded photos displayed in gallery format
- Action buttons for status changes

---

## Images

**Hero Image:**
- Location: Full-width background of hero section
- Description: Modern beauty salon interior - clean, well-lit space with styling chairs and mirrors, or a professional stylist working on a satisfied customer. Should feel upscale yet approachable. Bright, natural lighting preferred. Could also use a close-up of a fresh, modern haircut/styling result.
- Style: Professional photography, warm tones, inviting atmosphere
- Overlay: Dark gradient overlay (from bottom to top, 40% opacity) to ensure text readability

**Optional Feature Icons:**
- Use Material Icons for features section instead of images
- Icons should be large (text-4xl), primary color

---

## Accessibility & Polish

- All form inputs must have proper labels with Korean text
- Error states with red borders and helper text below fields
- Success confirmations with green check marks
- Loading states for form submission and data fetching
- Smooth transitions (transition-all duration-200)
- Hover states for all interactive elements
- Focus rings for keyboard navigation (ring-2 ring-primary ring-offset-2)
- Consistent dark mode throughout (form inputs, tables, cards)

## Animations

**Use Sparingly:**
- Fade-in on scroll for feature cards (intersection observer)
- Smooth page transitions
- Button press feedback (scale-95 on active)
- No excessive motion - keep it professional