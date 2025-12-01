# StratiumeX Design Guidelines

## Design Approach
**Reference-Based:** Inspired by Stripe and Vercel's sophisticated dark themes, smooth animations, and modern 3D visual elements. Focus on premium, tech-forward aesthetic with depth and interactivity.

## Color System
- **Primary:** #6366F1 (Electric Indigo) - CTAs, links, accents
- **Secondary:** #8B5CF6 (Purple) - Supporting elements, gradients
- **Accent:** #06B6D4 (Cyan) - Highlights, interactive states
- **Background:** #0F0F23 (Deep Navy) - Main background
- **Surface:** #1E1E3F (Dark Slate) - Cards, elevated surfaces
- **Text:** #F8FAFC (Off-white) - Primary text content

## Typography
- **Primary Font:** Inter - UI elements, body text (400, 500, 600, 700 weights)
- **Secondary Font:** Poppins - Headlines, emphasis (600, 700 weights)
- **Hierarchy:** 
  - Hero Headlines: 3xl-6xl, Poppins Bold
  - Section Headers: 2xl-4xl, Poppins Semibold
  - Body: base-lg, Inter Regular
  - Captions: sm-base, Inter Medium

## Layout System
**Spacing:** Use Tailwind units of 4, 6, 8, 12, 16, 24 (primary: 24px/6 for section spacing)
- Section padding: py-16 md:py-24
- Component gaps: gap-6 to gap-8
- Container: max-w-7xl with px-6

## Component Design

### Hero Section
Full viewport height with 3D animated elements, gradient overlays, and parallax scrolling. Include large hero image with tech/futuristic aesthetic showing abstract 3D shapes or digital workspace. Floating CTA buttons with backdrop blur (backdrop-blur-md bg-primary/20). Animated gradient text for headline.

### Product Showcase Cards
Glassmorphism cards (backdrop-blur-lg bg-surface/50) with 3D depth effects on hover (transform translateZ). Include:
- Icon/thumbnail at top
- Product title and description
- Subtle glow effect (shadow-xl shadow-primary/20)
- Hover: lift animation (scale-105), enhanced glow

### Founder Profiles
Grid layout (3 columns on desktop) with circular profile images, names, roles. Cards with Surface background, subtle border-glow on hover.

### Contact Form
Glassmorphism container with floating label inputs. Dark input backgrounds (#1E1E3F) with cyan focus rings. Gradient submit button with hover scale effect.

### Navigation
Sticky dark navbar with backdrop blur, logo left, nav links center, CTA button right. Mobile: hamburger with slide-in menu. Smooth scroll to sections.

## Visual Effects

### 3D Effects
- Card depth: transform-gpu translate-z hover states
- Layered shadows: Use multiple box-shadows for depth
- Perspective on containers: perspective-1000

### Animations
- Scroll-triggered: Fade-in-up for sections (intersection observer)
- Parallax: Background elements move slower than foreground
- Hover states: Smooth scale, glow intensity, subtle rotation
- Page transitions: Fade between sections

### Glassmorphism
Apply to cards, modals, navigation: backdrop-blur-lg bg-surface/30 border border-white/10

### Gradients
- Hero overlay: Linear gradient from primary to secondary with opacity
- Text gradients: bg-gradient-to-r from-primary via-secondary to-accent
- Card backgrounds: Radial gradients with low opacity

## Images
**Hero:** Large abstract 3D rendering or digital workspace visualization showing modern tech aesthetic (holographic elements, floating UI components, or geometric patterns). Full viewport width.

**Product Sections:** Icon-based graphics or screenshots of digital products/courses. Use hover zoom effect.

**Founders:** Professional headshots with consistent lighting/treatment against neutral backgrounds.

## Grid Layouts
- Products/Courses: 3-column grid (1 col mobile, 2 tablet, 3 desktop)
- Features: 2-column alternating image-text layout
- Use gap-8 for breathing room

## Key Principles
- Every element has depth through shadows/glows
- Smooth transitions (duration-300 ease-in-out)
- Consistent 24px vertical rhythm
- Interactive feedback on all clickable elements
- Mobile-first responsive breakpoints
- Floating elements with subtle animations create dynamism