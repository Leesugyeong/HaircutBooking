# 성북구 대학생 미용실 예약 서비스

## Overview

This is a Korean-language beauty salon booking service specifically designed for university students in Seongbuk-gu, Seoul. The application allows students to book salon appointments by providing their details, preferences for stylist gender/age, desired location, and price range. An admin dashboard enables staff to view and manage all bookings.

The service follows a modern, mobile-first design approach with a warm, professional aesthetic targeting young university students. It emphasizes clarity in the booking flow and trust-building through professional presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management with 3-second refetch interval for bookings

**UI Component Library:**
- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component style: "new-york" variant
- Korean fonts: Noto Sans KR (primary), Pretendard (accent/headers)

**Design System:**
- Custom HSL-based color palette with light/dark mode support
- Primary color: Warm rose/pink (330° 75% 55% in light mode) for beauty service aesthetic
- Mobile-first responsive design targeting university students
- Hover and active state elevations using CSS custom properties

**Key Pages:**
- Home page with hero section, features, how-it-works, and booking form
- Admin page with login and dashboard for managing bookings

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- RESTful API design pattern
- Session-based authentication using connect-pg-simple (configured but not fully implemented)

**API Endpoints:**
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Retrieve all bookings
- `PATCH /api/bookings/:id/status` - Update booking status

**Data Validation:**
- Zod schemas for runtime type validation
- Drizzle-Zod integration for database schema validation

**Storage Layer:**
- Abstracted storage interface (IStorage) for CRUD operations
- In-memory storage implementation (MemStorage) for development
- Ready for migration to persistent database via the storage interface pattern

### Database Design

**ORM & Migrations:**
- Drizzle ORM configured for PostgreSQL
- Schema-first approach with TypeScript type inference
- Migration system configured (drizzle-kit)

**Schema Tables:**

1. **users** - User authentication
   - id (UUID primary key)
   - username (unique)
   - password

2. **bookings** - Salon appointment bookings
   - id (UUID primary key)
   - date, time - Appointment scheduling
   - name, phone, email - Customer contact info
   - school, studentId - Student verification
   - location - Service location (17 areas in Seongbuk-gu)
   - priceRange - Budget preference
   - stylistGender, stylistAge - Stylist preferences
   - desiredStyle, additionalNotes - Optional styling requests
   - status - Booking state (default: "대기중" / waiting)
   - createdAt - Timestamp

**Database Connection:**
- Neon serverless PostgreSQL configured
- WebSocket support for serverless environment
- Connection pooling via @neondatabase/serverless

### State Management

**Client-Side State:**
- React Hook Form for form state with Zod validation
- TanStack Query for server state caching
- Local component state for UI interactions (admin login, etc.)

**Form Validation Strategy:**
- Zod schemas define validation rules
- @hookform/resolvers integrates Zod with React Hook Form
- Client-side validation before API submission
- Server-side validation using same Zod schemas

### Development & Build

**Development Mode:**
- Vite middleware integration with Express
- Hot Module Replacement (HMR)
- Replit-specific plugins for error overlay and dev tools

**Production Build:**
- Vite builds frontend to `dist/public`
- esbuild bundles backend with ESM format
- Separate client/server build processes

**Path Aliases:**
- `@/*` → client/src
- `@shared/*` → shared (types, schemas)
- `@assets/*` → attached_assets

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless** - Serverless PostgreSQL driver for Neon database
- **drizzle-orm** - TypeScript ORM for database operations
- **express** - Web server framework
- **react** / **react-dom** - UI framework
- **@tanstack/react-query** - Server state management

### UI Component Libraries
- **@radix-ui/react-*** - Headless UI primitives (20+ components)
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Type-safe variant styling
- **lucide-react** - Icon library

### Form & Validation
- **react-hook-form** - Form state management
- **zod** - Schema validation
- **@hookform/resolvers** - Validation resolver integration
- **drizzle-zod** - Database schema to Zod conversion

### Development Tools
- **vite** - Build tool and dev server
- **typescript** - Type system
- **@vitejs/plugin-react** - React integration for Vite
- **@replit/vite-plugin-*** - Replit development utilities

### Styling & Utilities
- **clsx** / **tailwind-merge** - Conditional class merging
- **date-fns** - Date manipulation
- **nanoid** - Unique ID generation

### Session & Authentication (Configured)
- **connect-pg-simple** - PostgreSQL session store for Express
- Note: Authentication flow is partially implemented (admin login uses hardcoded credentials)

### Database Configuration
- Database URL must be provided via `DATABASE_URL` environment variable
- Drizzle migrations output to `./migrations` directory
- Schema located at `./shared/schema.ts`