# satyesh-portfolio

> **Premium Full-Stack Freelancer Portfolio & Admin CMS**
> Built according to the Full Master Requirements Specification.

## 🚀 Architecture Overview

* **Frontend (`/client`)**: Next.js 14+ (App Router, TypeScript), Tailwind CSS, Framer Motion, Lucide Icons, Clerk Auth (`@clerk/nextjs`).
* **Backend (`/server`)**: Node.js + Express REST API (TypeScript), MongoDB & Mongoose ODM, `@clerk/backend` authorization, Cloudinary SDK.
* **Design System**: "Premium Editorial White" (`#FAFAF9` light mode default, `#0A0A0A` dark mode via toggle, `#2563EB` blue accent, `Manrope` typography).

---

## 📁 Repository Structure

```text
satyesh-portfolio/
├── client/              # Next.js App Router Frontend & Admin CMS
│   ├── app/
│   │   ├── (public)/    # Public routes (/, /about, /services, /projects, /experience, /contact)
│   │   └── admin/       # Clerk-protected CMS (/admin, /admin/projects, /admin/inquiries, etc.)
│   ├── components/      # UI primitives, layout headers/footers, admin components
│   ├── lib/             # API client, theme utilities, helper functions
│   ├── types/           # TypeScript interfaces & types
│   └── data/            # Local fallback mock data
└── server/              # Express REST API & MongoDB Backend
    ├── config/          # Database & Cloudinary config
    ├── controllers/     # Express route handlers
    ├── middleware/      # Clerk auth, error handling, rate limiting
    ├── models/          # Mongoose schemas (Project, Service, Experience, Inquiry, Testimonial, Settings)
    ├── routes/          # REST API endpoints (/api/*)
    └── server.ts        # Server entry point
```

---

## 🛠️ Environment Variables Setup

### Client Environment Variables (`/client/.env.local`)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Server Environment Variables (`/server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/satyesh-portfolio
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_ORIGIN=http://localhost:3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
ADMIN_EMAIL=satyesh@example.com
```

---

## 🚦 Getting Started

### 1. Install Dependencies
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Development Mode
```bash
# Run server (from /server)
npm run dev

# Run client (from /client)
npm run dev
```

---

## 📜 Key Features

1. **Editorial White Design System**: Premium off-white aesthetic with Manrope typography hierarchy, smooth micro-interactions, and dark mode toggle.
2. **Dynamic Project Case Studies**: Multi-section detail view including Problem, Solution, Architecture, Challenges, Solutions, Results, Tech Stack, and Gallery.
3. **Protected Admin CMS**: Manage Projects, Services, Career Experience, Inquiries (Pipeline stage manager), Testimonials, and Site Settings.
4. **Independent Backend Authorization**: Express backend verifies Clerk credentials independently for all CMS mutation routes.
5. **Lead System**: Public inquiry intake with client/server validation, rate limiting, and MongoDB persistence.
