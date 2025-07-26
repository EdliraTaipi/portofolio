# Edlira Taipi Portfolio Website

## Overview

This is a personal portfolio website for Edlira Taipi, an MSc Digital Marketing graduate. The application is built as a modern full-stack web application showcasing her academic projects, skills, and professional experience in digital marketing. The site features a clean, professional design with sections for about information, project portfolio, skills showcase, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Less colorful design, super animated and eye-catching interface.
Navigation: Seamless navigation between portfolios without clicking back.
UI Elements: Navigation bar with search icon in upper section.
Branding: Make name more visible and prominent.
External Links: LinkedIn profile integration at https://www.linkedin.com/in/edlira-taipi/
UX Improvements: Easy page navigation with back-to-top functionality.
Project Display: Full project descriptions viewable in modal format.

## System Architecture

The application follows a monorepo structure with a clear separation between client and server code:

- **Frontend**: React-based single-page application built with Vite
- **Backend**: Express.js REST API server  
- **Database**: PostgreSQL with Drizzle ORM for data management
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Build System**: Vite for frontend bundling, esbuild for server bundling

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: Neon serverless PostgreSQL with Drizzle ORM and connection pooling
- **Storage Layer**: DatabaseStorage class implementing IStorage interface for data operations
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints for projects and contact form with full database integration
- **Development**: Hot reload with Vite middleware integration

### Database Schema
The application uses PostgreSQL with Drizzle ORM and two main tables:
- **Projects**: Stores portfolio project information with UUID primary keys including title, description, category, tags array, and styling metadata
- **Contact Messages**: Stores submitted contact form data with validation and UUID primary keys

Database connection uses Neon serverless PostgreSQL with connection pooling for optimal performance.

## Data Flow

1. **Project Display**: Frontend fetches projects from `/api/projects` endpoint which queries PostgreSQL database and displays them in a responsive grid layout
2. **Contact Form**: Form submissions are validated client-side with Zod, then sent to `/api/contact` endpoint for database storage
3. **Database Initialization**: Projects are automatically seeded on first startup with comprehensive strategic management portfolio data
4. **Static Assets**: Vite handles asset optimization and serving in development, with build output for production
5. **Session Management**: Server maintains session state for potential future authentication features

## External Dependencies

### Core Dependencies
- **Database**: Neon Database serverless PostgreSQL
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **TypeScript**: Type safety across the entire application
- **Drizzle Kit**: Database migrations and schema management
- **Vite Plugins**: Runtime error overlay and development tooling
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

The application is designed for deployment on platforms like Replit or similar Node.js hosting:

- **Build Process**: 
  - Frontend builds to `dist/public` directory
  - Backend bundles to `dist/index.js` with external dependencies
- **Environment Variables**: `DATABASE_URL` and PostgreSQL credentials for Neon database connection
- **Database Setup**: Drizzle schema push handles table creation, with automatic project data seeding on first startup
- **Production Server**: Serves built frontend assets and API endpoints from single Node.js process

The application includes development-specific features like Replit integration and hot reload that are conditionally loaded based on environment variables.

## Recent Changes

- **January 25, 2025**: Email notification system successfully implemented and tested with Brevo SMTP
  - **Brevo SMTP Working**: Direct SMTP delivery confirmed working with user's credentials (smtp-relay.brevo.com:587)
  - **Professional Email Delivery**: HTML-formatted emails with contact details delivered to edlira.taipi@hotmail.com
  - **Message ID Tracking**: Email delivery confirmed with Brevo message IDs for tracking
  - **Multi-tier Backup**: Primary Brevo SMTP → Backup FormSubmit → Final ntfy.sh notifications
  - **Search Removal**: Completely removed search functionality from navigation per user request
  - **Professional Email Templates**: Beautiful HTML formatting with reply functionality and professional styling
  - **Message Dashboard**: /messages page displays all contact form submissions for manual review
  - **Email Confirmation**: Contact form responses include emailSent status and message tracking
  - **GitHub Ready**: Complete project documentation and README prepared for GitHub deployment

- **January 25, 2025**: Complete mobile-friendly responsive design implementation
  - **Mobile Navigation**: Responsive navigation with optimized spacing and mobile-friendly LinkedIn button text
  - **Responsive Typography**: Scalable text sizes from mobile (text-2xl) to desktop (text-8xl) for optimal readability
  - **Mobile Portfolio Grid**: Adaptive grid layouts that stack properly on mobile devices (1 column → 2-3 columns)
  - **Touch-Friendly Interfaces**: Optimized button sizes and spacing for mobile interactions
  - **Responsive Contact Form**: Mobile-optimized form layout with improved spacing and button sizing
  - **Flexible Layouts**: All sections adapt smoothly across mobile, tablet, and desktop breakpoints
  - **Performance Optimization**: Reduced padding and margins on mobile for better content visibility

- **January 25, 2025**: Enhanced LinkedIn visibility with animated connection buttons  
  - **Animated LinkedIn Buttons**: Eye-catching buttons with blue glow, shimmer, and icon animations across all pages
  - **Multiple Placements**: Large button on Professional Summary page and compact version in navigation bar
  - **Professional Animations**: Gentle pulsing glow, shimmer effects, and rotating LinkedIn icon for visibility
  - **Consistent Branding**: Blue animations match overall blue accent theme while maintaining gray/white design
  - **Hover Interactions**: Smooth scale and shadow effects for enhanced user engagement
  - **Always Accessible**: LinkedIn connection available from every page through navigation bar

- **January 25, 2025**: Complete portfolio redesign with unified animated interface and Professional Summary as home page
  - **Site Structure**: Made Professional Summary the home page (/) with portfolio moved to /portfolio
  - **Contact Form**: Added professional contact form with optional phone number field and database storage for visitor messages
  - **Messages Dashboard**: Created /messages page to view all contact form submissions without requiring email API keys
  - **Animated Header**: Centered animated name with gradient text effects and pulsing animations
  - **Enhanced CTA**: Made "View My Portfolio" button more prominent with hover effects and clear visual cues
  - **LinkedIn Integration**: Enhanced LinkedIn button visibility in header navigation
  - **Educational Qualifications**: Updated to include complete academic background:
    - MSc in Digital Marketing (Ravensbourne University)
    - Level 8 Diploma in Strategic Management and Leadership
    - Level 7 in Project Management
    - Bachelor Degree in Accounting and Finance (University of Peloponnese)
  - **Contact Section**: Simplified to contact form and LinkedIn integration (removed industry experience and direct email display)
  - Implemented dark theme with less colorful design as requested
  - Added seamless navigation between portfolio sections without page reloads
  - Enhanced animations with particle backgrounds and glassmorphism effects
  - Integrated all strategic management projects from user documents (25 total projects)