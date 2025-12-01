# StratiumeX - Digital Products, AI Agents & Web Development Platform

## Overview

StratiumeX is a modern web application showcasing digital products, AI automation solutions, and web development courses. Built as a single-page application with a focus on premium user experience, the platform features a dark-themed, tech-forward aesthetic inspired by Stripe and Vercel's design systems. The application serves as both a marketing platform and a contact management system for a digital products company.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript, using Vite as the build tool and development server
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack Query (React Query) for server state management
- **Styling:** Tailwind CSS with custom design tokens, using the shadcn/ui component library (New York variant)
- **UI Components:** Radix UI primitives for accessible, headless components
- **Animations:** Framer Motion for smooth transitions and interactive effects
- **Forms:** React Hook Form with Zod validation

**Design System:**
The application implements a sophisticated dark theme with custom CSS variables defining a comprehensive color system:
- Primary color: Electric Indigo (#6366F1)
- Secondary color: Purple (#8B5CF6)
- Accent color: Cyan (#06B6D4)
- Background: Deep Navy (#0F0F23)
- Typography: Inter for body text, Poppins for headings

**Component Architecture:**
- Single-page application with component-based structure
- Reusable UI components following atomic design principles
- Section-based page layout (Hero, Products, AI Agents, Courses, Founders, Contact, Footer)
- Responsive design with mobile-first approach using Tailwind breakpoints

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for HTTP server
- **Database ORM:** Drizzle ORM configured for PostgreSQL
- **Database Provider:** Neon Database (serverless PostgreSQL)
- **Validation:** Zod schemas for type-safe data validation
- **Session Management:** Express sessions with connect-pg-simple for session storage

**API Design:**
RESTful API with minimal endpoints:
- `POST /api/contact` - Contact form submission endpoint with validation

**Data Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Schema-first approach using Drizzle ORM
- Database schema defined in `shared/schema.ts` for type sharing between client and server

**Server Architecture Decisions:**
- Middleware-based request processing pipeline
- Custom logging middleware for request/response tracking
- Static file serving for production builds
- Vite integration for development with HMR support
- Build optimization with esbuild bundling selective dependencies

### Database Schema

**Contact Submissions Table:**
- `id` (VARCHAR, primary key) - UUID identifier
- `name` (TEXT, required) - Contact person name
- `email` (TEXT, required) - Contact email address
- `company` (TEXT, optional) - Company name
- `subject` (TEXT, required) - Message subject
- `message` (TEXT, required) - Message content
- `createdAt` (TIMESTAMP, default now) - Submission timestamp

**Design Decisions:**
- Schema validation using Drizzle Zod for runtime type safety
- Shared type definitions between client and server preventing type drift
- Minimal schema reflecting current MVP requirements
- Ready for migration to full database implementation

### Build System

**Development:**
- Vite dev server with HMR for instant feedback
- TypeScript compilation without emit (type checking only)
- Custom Vite middleware integration with Express
- Development-only Replit plugins for debugging and cartography

**Production:**
- Two-stage build process: client (Vite) then server (esbuild)
- Client bundle output to `dist/public`
- Server bundled as CommonJS to `dist/index.cjs`
- Selective dependency bundling for reduced cold start times
- Allowlist approach for frequently used dependencies to minimize syscalls

**Rationale:**
This approach optimizes for both development experience and production performance, with separate build strategies for client and server code.

## External Dependencies

### UI Component Libraries
- **shadcn/ui:** Pre-built accessible components using Radix UI primitives
- **Radix UI:** Headless UI component primitives for building custom components
- **Lucide React:** Icon library for consistent iconography
- **Framer Motion:** Animation library for smooth transitions and interactive effects

### Database & ORM
- **Neon Database:** Serverless PostgreSQL database provider
- **Drizzle ORM:** TypeScript ORM with schema-first approach
- **@neondatabase/serverless:** Neon's serverless driver for edge compatibility

### Validation & Forms
- **Zod:** Schema validation library for runtime type safety
- **React Hook Form:** Performant form library with minimal re-renders
- **@hookform/resolvers:** Integration layer for Zod validation with React Hook Form

### Development Tools
- **Vite:** Fast build tool and development server
- **esbuild:** JavaScript bundler for production server builds
- **TypeScript:** Static type checking for enhanced developer experience
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal:** Development error overlay
- **@replit/vite-plugin-cartographer:** Code navigation tool
- **@replit/vite-plugin-dev-banner:** Development environment indicator

### Session Management
- **express-session:** Session middleware for Express
- **connect-pg-simple:** PostgreSQL session store adapter

**Integration Strategy:**
The application uses a modular approach where external dependencies are isolated to specific concerns (UI, data, validation), making it easier to swap implementations if needed. The build system selectively bundles performance-critical dependencies while externalizing others to balance bundle size and startup time.