import { Project, Service, Experience, Testimonial, SiteSettings } from '@/types';

export const mockSiteSettings: SiteSettings = {
  profileName: 'Satyesh Kumar',
  professionalTitle: 'Full Stack Developer | MERN Stack Developer | B.Tech CSE',
  tagline: 'Building responsive web applications, robust REST APIs, and scalable full-stack architectures.',
  bio: 'Full Stack Developer with hands-on experience in React.js, Node.js, Express.js, and MongoDB. Proficient in building responsive web applications, RESTful APIs, and secure authentication systems. Strong problem-solving skills with 250+ DSA problems solved in Java and a passion for clean, efficient, and scalable software development.',
  contactEmail: 'satyeshkumar578@gmail.com',
  location: 'Prayagraj, Uttar Pradesh, India',
  availabilityStatus: 'Available for freelance',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  twitterUrl: 'https://twitter.com',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=917307440594&text=Hi%20Satyesh,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!',
  heroHeading: 'I build responsive, production-ready full stack web applications.',
  heroSubheading: 'Full Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, and modern REST APIs.',
  metaDefaults: {
    title: 'Satyesh Kumar | Full Stack MERN Developer & Software Engineer',
    description: 'Portfolio of Satyesh Kumar - Full Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, and secure web application development.',
  },
};

export const mockServices: Service[] = [
  {
    _id: 'srv-1',
    title: 'Full-Stack Web Applications',
    slug: 'web-applications',
    shortDescription: 'End-to-end web applications built with React.js, Node.js, Express.js, and MongoDB.',
    description: 'Custom full-stack web applications featuring secure authentication, RESTful APIs, optimized MongoDB schemas, and responsive user interfaces.',
    features: ['React.js & Next.js Frontends', 'Express.js RESTful APIs', 'MongoDB Schema Architecture', 'JWT Authentication & Authorization'],
    icon: 'Code2',
    featured: true,
    status: 'published',
    order: 1,
  },
  {
    _id: 'srv-2',
    title: 'Frontend & Responsive UI',
    slug: 'frontend-responsive-ui',
    shortDescription: 'Mobile-first, cross-browser responsive interfaces with Tailwind CSS and modern React.',
    description: 'High-performance, accessible user interfaces built with React.js, Tailwind CSS, Bootstrap, and Framer Motion with smooth interactive animations.',
    features: ['Mobile-First Responsive Layouts', 'Cross-Browser Compatibility', 'Framer Motion Micro-Interactions', 'Clean Component Architecture'],
    icon: 'Globe',
    featured: true,
    status: 'published',
    order: 2,
  },
  {
    _id: 'srv-3',
    title: 'REST API & Backend Development',
    slug: 'rest-api-backend',
    shortDescription: 'Secure, scalable REST API architecture with role-based access control and data validation.',
    description: 'Backend services built on Node.js and Express.js with robust error handling, JWT session security, rate limiting, and database indexing.',
    features: ['REST API Design & Integration', 'Role-Based Access Control (RBAC)', 'Bcrypt Password Hashing & JWT', 'Postman API Testing'],
    icon: 'Wrench',
    featured: true,
    status: 'published',
    order: 3,
  },
  {
    _id: 'srv-4',
    title: 'Database Design & Optimization',
    slug: 'database-design',
    shortDescription: 'Structured NoSQL data modeling with MongoDB and MongoDB Atlas.',
    description: 'Document database modeling with Mongoose schemas, data validation, query optimization, and cloud deployment on MongoDB Atlas.',
    features: ['MongoDB Schema Design', 'Mongoose ODM & Validation', 'Atlas Cloud Deployment', 'High-Speed Query Indexing'],
    icon: 'ShoppingBag',
    featured: false,
    status: 'published',
    order: 4,
  },
];

export const mockProjects: Project[] = [
  {
    _id: 'proj-1',
    title: 'College PYQ Management System',
    slug: 'college-pyq-management-system',
    shortDescription: 'A centralized academic resource platform with keyword search, subject/year filtering, and secure PDF upload restricted to admin users.',
    category: 'Full Stack Web Application',
    problem: 'Academic institutions and students face disorganized, scattered repositories for previous year question papers, making subject/year filtering and verified access difficult.',
    solution: 'Developed a centralized academic resource platform with fast keyword search, multi-parameter subject/year filtering, and role-based Admin and Student modules.',
    features: [
      'Role-based Admin and Student access control modules',
      'RESTful APIs with MongoDB for high-speed document storage and multi-criteria filtering',
      'Secure PDF upload system with mime-type validation restricted to admin users',
      'Responsive, mobile-friendly interface across desktop and mobile devices'
    ],
    challenges: [
      'Ensuring fast query times across hundreds of academic papers categorized by multiple years and subjects.',
      'Securing administrative upload endpoints against unauthorized document submissions.'
    ],
    solutions: [
      'Built indexed MongoDB collections and optimized RESTful API route queries.',
      'Implemented role-based authentication guarding document mutation and upload handlers.'
    ],
    results: [
      'Sub-100ms API response times across question paper queries.',
      'Streamlined academic resource access with 80% faster search times for students.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API', 'JWT'],
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    status: 'published',
    order: 1,
  },
  {
    _id: 'proj-2',
    title: 'Career Sathi – Career Recommendation System',
    slug: 'career-sathi-recommendation-system',
    shortDescription: 'A career recommendation platform featuring 45+ assessment questions, 4 evaluation categories, and 10+ career stream recommendations.',
    category: 'Interactive Web Platform',
    problem: 'Students and learners struggle to choose suitable career paths due to lack of structured aptitude evaluation and psychometric guidance.',
    solution: 'Built and deployed a career recommendation platform with 45+ questions, a fast JavaScript scoring engine, and automated PDF report generation.',
    features: [
      '45+ Assessment questions across 4 evaluation categories',
      'Personalized guidance across 10+ modern career streams',
      'Algorithmic JavaScript scoring engine delivering recommendations in under 3 seconds',
      'One-click downloadable PDF career guidance report generator'
    ],
    challenges: [
      'Analyzing logical and psychometric scores instantaneously on the client side.',
      'Generating clean, downloadable PDF guidance reports without external server latency.'
    ],
    solutions: [
      'Designed a lightweight weighted scoring algorithm executed asynchronously in under 3 seconds.',
      'Implemented in-browser dynamic PDF rendering pipelines for one-click reports.'
    ],
    results: [
      'Deployed on Vercel with instant sub-3-second recommendation generation.',
      'Over 10+ personalized career pathways with dynamic PDF exports.'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Vercel', 'PDF Generation'],
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://career-sathi-recommendation-system.vercel.app',
    featured: true,
    status: 'published',
    order: 2,
  },
  {
    _id: 'proj-3',
    title: 'MERN Secure Authentication & RBAC System',
    slug: 'mern-secure-auth-system',
    shortDescription: 'A production-ready authentication suite with JWT, bcrypt password hashing, and role-based protected routes.',
    category: 'Full Stack Security',
    problem: 'Modern web applications require secure authentication workflows that prevent token tampering and unauthorized route access.',
    solution: 'Built an end-to-end authentication system utilizing bcrypt password encryption, JWT tokens, and role-based access middleware.',
    features: [
      'Secure JWT authentication & token validation',
      'Bcrypt password encryption with cryptographic salt rounds',
      'Role-based access control (RBAC) middleware for protected endpoints',
      'Responsive React frontend with authenticated state persistence'
    ],
    challenges: [
      'Safeguarding authentication tokens and preventing unauthorized privilege escalation.'
    ],
    solutions: [
      'Configured HTTP-only cookie token transmission and strict server-side role verification middleware.'
    ],
    results: [
      'Zero unauthorized route leaks and sub-50ms token verification.',
      'Reusable authentication architecture for full-stack deployments.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bcrypt', 'Tailwind CSS'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    status: 'published',
    order: 3,
  },
];

export const mockExperience: Experience[] = [
  {
    _id: 'exp-1',
    company: 'CodeVirus Security',
    role: 'Full Stack Developer Intern',
    description: 'Engineered and optimized full-stack web applications and internal dashboard interfaces using React.js, Node.js, Express.js, and MongoDB. Implemented secure RESTful APIs, JWT authentication, and role-based access control (RBAC). Delivered mobile-first, cross-browser responsive layouts with Tailwind CSS, resolved UI inconsistencies, and collaborated in an Agile development environment.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs', 'JWT', 'Git'],
    startDate: 'Jan 2026',
    endDate: 'Present',
    current: true,
    order: 1,
  },
  {
    _id: 'exp-2',
    company: 'Freelance & Project Engineering',
    role: 'Full Stack Developer',
    description: 'Architecting and developing full-stack web applications, academic management portals, and custom REST API solutions with React.js, Node.js, Express.js, and MongoDB Atlas.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    startDate: '2024',
    endDate: 'Present',
    current: true,
    order: 2,
  },
];

// Testimonials array is kept empty by default in adherence to portfolio guidelines
export const mockTestimonials: Testimonial[] = [];
