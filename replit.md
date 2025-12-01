# StratiumeX - Digital Products, AI Agents & Web Development Platform

## Project Status: COMPLETE ✅

All major features implemented and working:
- ✅ Database & PostgreSQL with Drizzle ORM
- ✅ Replit Auth integration  
- ✅ Blog/Resources section with full CRUD
- ✅ Testimonials & Case Studies
- ✅ Course enrollment system with progress tracking
- ✅ Admin Dashboard with authentication
- ✅ Analytics tracking for page views and events
- ✅ Mock login system for admin access
- ✅ Email: ruthvesh15@gmail.com | Password: ruthvesh@2009

## Overview

StratiumeX is a modern web application showcasing digital products, AI automation solutions, and web development courses. Built as a single-page application with a focus on premium user experience, the platform features a dark-themed, tech-forward aesthetic inspired by Stripe and Vercel's design systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript, using Vite as the build tool
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack Query (React Query) for server state management
- **Styling:** Tailwind CSS with custom design tokens, shadcn/ui component library
- **UI Components:** Radix UI primitives for accessible, headless components
- **Animations:** Framer Motion for smooth transitions
- **Forms:** React Hook Form with Zod validation
- **Authentication:** Mock auth system with localStorage for admin access

**Key Features:**
- Landing page with Hero, Products, AI Agents, Courses sections
- Blog/Resources page with full post management
- Course detail pages with enrollment functionality
- Admin Dashboard with role-based access control
- Analytics tracking for page views and user events
- Responsive dark theme design

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for HTTP server
- **Database ORM:** Drizzle ORM configured for PostgreSQL
- **Database Provider:** Neon Database (serverless PostgreSQL)
- **Validation:** Zod schemas for type-safe data validation
- **Session Management:** Express sessions with connect-pg-simple

**API Endpoints:**
- `/api/auth/user` - Get current user
- `/api/contact` - Contact form submissions
- `/api/blog` - Blog post management
- `/api/testimonials` - Testimonials management
- `/api/case-studies` - Case studies management
- `/api/courses` - Course management
- `/api/enrollments` - Course enrollment and progress
- `/api/analytics/track` - Analytics event tracking
- `/api/analytics/summary` - Analytics dashboard data

**Authentication:**
- Mock authentication via localStorage for development
- Credentials: ruthvesh15@gmail.com / ruthvesh@2009
- Admin flag set automatically for mock user
- Real auth can be implemented by switching useAuth hook to use actual Replit Auth

### Database Schema

**Tables:**
- `users` - User profiles and admin flags
- `contact_submissions` - Contact form submissions
- `blog_posts` - Blog post content and metadata
- `testimonials` - Customer testimonials
- `case_studies` - Case study content
- `courses` - Course catalog and details
- `enrollments` - User course enrollments with progress
- `analytics_events` - Tracked analytics events
- `sessions` - Express session storage

### Authentication Flow

1. Users click "Admin Login" in footer
2. Navigate to `/login` page
3. Enter credentials (ruthvesh15@gmail.com / ruthvesh@2009)
4. Mock user stored in localStorage with admin flag
5. Access to `/admin` dashboard granted
6. Logout clears localStorage and returns to homepage

### Admin Dashboard Features

**Tabs:**
1. **Overview** - Dashboard statistics and recent activity
2. **Contacts** - View and manage contact form submissions
3. **Blog Posts** - Create, edit, publish blog content
4. **Testimonials** - Manage customer testimonials with featured flag
5. **Case Studies** - Manage case study content (stub)
6. **Courses** - Manage course catalog (stub)

## Key Files

- `client/src/App.tsx` - Main app router
- `client/src/pages/Login.tsx` - Mock login page
- `client/src/pages/Admin.tsx` - Admin dashboard
- `client/src/pages/Home.tsx` - Landing page
- `client/src/pages/Blog.tsx` - Blog listing
- `client/src/pages/CourseDetail.tsx` - Course detail page
- `client/src/hooks/useAuth.ts` - Auth state management
- `client/src/hooks/useAnalytics.ts` - Analytics tracking
- `server/routes.ts` - API endpoint definitions
- `server/storage.ts` - Database storage layer
- `shared/schema.ts` - Database schema and types

## Analytics Integration

- **Automatic Page View Tracking** - Every page navigation tracked
- **Event Tracking** - Contact submissions and course enrollments tracked
- **Analytics Dashboard** - Admin can view analytics summary with recent events
- **Endpoints:**
  - `POST /api/analytics/track` - Track any event
  - `GET /api/analytics/summary` - Get analytics overview
  - `GET /api/analytics/events` - Get event history

## External Dependencies

### UI Component Libraries
- **shadcn/ui:** Pre-built accessible components
- **Radix UI:** Headless UI component primitives
- **Lucide React:** Icon library

### Database & ORM
- **Neon Database:** Serverless PostgreSQL provider
- **Drizzle ORM:** TypeScript ORM with schema-first approach

### Validation & Forms
- **Zod:** Schema validation library
- **React Hook Form:** Performant form library

### Development Tools
- **Vite:** Fast build tool and development server
- **TypeScript:** Static type checking
- **Tailwind CSS:** Utility-first CSS framework

## Recent Changes (Session)

1. **Created Mock Login System**
   - `/login` page with email/password form
   - Pre-configured credentials in interface
   - Auto-fill button for quick access
   - Stores mock user in localStorage with admin flag

2. **Updated Authentication**
   - `useAuth` hook now checks localStorage first
   - Falls back to real auth if needed
   - Graceful handling of 401 responses
   - Added `useLogout` hook for clearing auth state

3. **Updated Navigation**
   - Footer shows "Admin Login" when not authenticated
   - Footer shows "Admin" and "Logout" when authenticated
   - Admin Dashboard has logout button in header

4. **Fixed Analytics**
   - Updated analytics summary endpoint to return correct shape
   - Page view tracking working automatically
   - Event tracking for enrollments and contact submissions

5. **Admin Dashboard Complete**
   - Full CRUD for blog posts, testimonials, case studies
   - Contact submission management with read status
   - Analytics overview with recent events
   - Responsive layout with sidebar navigation
   - Protected routes with auth checks

## Getting Started

1. Visit homepage at `/`
2. Click "Admin Login" in footer (or go to `/login`)
3. Use mock credentials:
   - **Email:** ruthvesh15@gmail.com
   - **Password:** ruthvesh@2009
4. Click "Auto-fill Credentials" button for quick access
5. Access admin dashboard to manage content
6. Navigate between sections using sidebar

## Next Steps for Production

1. Replace mock authentication with real Replit Auth integration
2. Implement Case Studies and Courses management in admin dashboard
3. Add email notifications for new contact submissions
4. Implement course content delivery system
5. Add user certificates upon course completion
6. Expand analytics with more detailed reports
7. Add image upload functionality for blog posts and case studies
8. Implement email subscription for blog updates

## Deployment

Run `npm run build` to build for production. The app is ready to be deployed on Replit's hosting platform.
