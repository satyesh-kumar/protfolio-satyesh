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
    _id: 'proj-paperbridge',
    title: 'PaperBridge — Past Papers Platform',
    slug: 'paperbridge',
    shortDescription: 'A full-stack academic platform designed to make past university question papers easier to discover, filter, preview, and access.',
    category: 'Full-Stack Web Application',
    projectType: 'Academic Resource Platform',
    clientProject: false,
    problem: 'University students and faculty face disorganized, scattered repositories for previous-year examination papers, making subject-level, year-wise, and semester-based academic discovery slow and friction-heavy.',
    goal: 'Centralize academic question papers into an indexed repository with instant keyword search, year/semester filtering, and authenticated administrative document management.',
    solution: 'Architected and deployed PaperBridge as a centralized academic resource platform with multi-criteria search filtering, responsive PDF inspection, structured MongoDB schemas, and role-guarded upload permissions for United University.',
    features: [
      'Multi-criteria search engine indexing papers by subject name, paper code, and department',
      'Faceted filtering system across academic year, degree program, semester, and examination type',
      'In-browser PDF preview pipeline enabling students to inspect past exam papers without forced downloads',
      'Role-based administrative control module with Clerk authentication for verified paper uploads',
      'RESTful API architecture with MongoDB query optimization and mime-type document validation',
      'Mobile-responsive academic user interface with dark and light theme adaptability'
    ],
    challenges: [
      'Structuring scalable NoSQL schema models capable of managing multi-department curricula across diverse examination formats.',
      'Ensuring rapid document search and filter responsiveness without client-side lag across extensive paper archives.'
    ],
    solutions: [
      'Constructed normalized Mongoose schemas with indexed lookup tags for instant query resolution.',
      'Implemented debounced search inputs paired with server-side query filters.'
    ],
    results: [
      'Official academic repository and study notes vault deployed live for United University students.',
      'Sub-100ms API response latency across question paper searches.',
      'Zero unauthorized document upload incidents through role-based access enforcement.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API', 'Vercel'],
    coverImage: '/projects/paperbridge/cover.png',
    gallery: [
      '/projects/paperbridge/cover.png',
      '/projects/paperbridge/search-filter.svg',
      '/projects/paperbridge/paper-preview.svg'
    ],
    liveUrl: 'https://paper-bridge-pyq-mangagement-system.vercel.app/',
    engineeringArchitecture: {
      frontend: 'React single-page architecture built with Vite, Tailwind CSS, Playfair Display & Plus Jakarta Sans typography, and Lucide icon systems.',
      backend: 'Node.js & Express RESTful API with structured routing, input sanitization, and CORS security policies.',
      database: 'MongoDB document collections with compound indexes on subject code, semester, and academic year for low-latency queries.',
      auth: 'Role-based access control protecting mutation endpoints and restricting paper uploads to verified administrators.',
      storage: 'Cloud-hosted document delivery pipelines ensuring fast streaming of multi-page academic examination PDFs.',
      deployment: 'Production deployment on Vercel with automated CI/CD continuous delivery.'
    },
    engineeringDecisions: [
      {
        decision: 'Compound Database Indexing on Subject Code & Academic Year',
        rationale: 'Students frequently filter by both subject and year simultaneously; indexing these fields together cut query times to sub-100ms.'
      },
      {
        decision: 'In-Browser PDF Stream Previews',
        rationale: 'Rather than forcing downloads on mobile devices, inline previewing reduces data bandwidth and accelerates exam preparation.'
      },
      {
        decision: 'Role-Guarded Document Upload Workflows',
        rationale: 'Protects the academic integrity of the examination archive by ensuring only verified faculty and staff can upload papers.'
      }
    ],
    seo: {
      metaTitle: 'PaperBridge — Full-Stack Web Application | Satyesh Kumar',
      metaDescription: 'PaperBridge is a full-stack academic platform designed to make past university question papers easier to discover, filter, and access.',
      keywords: ['PaperBridge', 'United University', 'Past Papers', 'PYQ Management System', 'Full Stack Developer', 'MERN Stack'],
      ogImage: '/projects/paperbridge/cover.png',
      canonicalUrl: 'https://satyesh.dev/projects/paperbridge'
    },
    featured: true,
    status: 'published',
    order: 1,
  },
  {
    _id: 'proj-manoj-traders',
    title: 'Manoj Traders — E-commerce Platform',
    slug: 'ecommerce-client',
    shortDescription: 'Production e-commerce storefront engineered for an authentic kirana supermarket featuring catalog aisles, cart management, Clerk authentication, and bilingual UI.',
    category: 'E-commerce / Business Web Application',
    projectType: 'E-commerce Client Project',
    clientProject: true,
    problem: 'The retail grocery business required an intuitive, modern digital storefront to present organic produce, farm staples, and grocery aisles online with rapid express order flows and mobile-first responsiveness.',
    goal: 'Build a high-performance e-commerce platform delivering instant search across supermarket aisles, real-time cart persistence, bilingual localization, and user account management.',
    solution: 'Architected and deployed a production e-commerce application with Next.js App Router, Tailwind CSS, Clerk authentication, slide-out cart management, and order tracking systems built collaboratively for Manoj Traders.',
    features: [
      'Comprehensive supermarket catalog organized into distinct grocery aisles (Spices, Ghee, Oils, Basmati, Kirana)',
      'Bilingual user experience supporting one-click toggling between English and Hindi interfaces',
      'Persistent shopping basket and slide-out cart drawer with real-time price tallying and quantity adjustment',
      'Live order tracking pipeline displaying real-time preparation and dispatch progress',
      'Customer authentication and protected account profiles powered by Clerk',
      'Instant keyword search across organic produce, flash deals, and grocery staples',
      'Mobile-first responsive navigation bar with dedicated category drawers and bottom navigation'
    ],
    challenges: [
      'Delivering sub-second responsive catalog browsing across hundreds of Kirana SKUs with high-resolution imagery on mobile devices.',
      'Ensuring seamless localization toggling between English and Hindi without layout shifts.'
    ],
    solutions: [
      'Leveraged Next.js image optimization and responsive grid layouts to maintain consistent 60fps scrolling.',
      'Implemented centralized language context providers handling atomic label swaps smoothly.'
    ],
    results: [
      'Live production e-commerce platform actively deployed and accessible at ecom-phi-dusky.vercel.app.',
      'Full bilingual supermarket shopping experience with 24-hour express fulfillment messaging.',
      'Verified collaborative delivery engineered by Satyesh Kumar and Shaswat Jaiswal for Manoj Traders.'
    ],
    technologies: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Clerk Auth', 'Lucide Icons', 'Vercel'],
    coverImage: '/projects/manoj-traders/cover.png',
    gallery: [
      '/projects/manoj-traders/cover.png',
      '/projects/manoj-traders/storefront.svg',
      '/projects/manoj-traders/cart-aisles.svg'
    ],
    liveUrl: 'https://ecom-phi-dusky.vercel.app/',
    engineeringArchitecture: {
      frontend: 'Next.js App Router with server-side rendered storefront components, Tailwind CSS styling, and Lucide system icons.',
      backend: 'Modern Next.js API routes and server actions with end-to-end type safety.',
      database: 'Structured product and order schemas optimized for rapid catalog queries and category filtering.',
      auth: 'Clerk authentication providing secure session management, customer sign-in, and protected order views.',
      storage: 'Cloud-optimized asset delivery for high-resolution grocery imagery and promotional banners.',
      deployment: 'Deployed on Vercel with global edge CDN caching for sub-second page delivery across India.'
    },
    engineeringDecisions: [
      {
        decision: 'Bilingual Localization Architecture (English & Hindi)',
        rationale: 'Enables traditional Indian Kirana shoppers and diverse local demographics to navigate aisles effortlessly in their preferred language.'
      },
      {
        decision: 'Server-Side Rendering (SSR) with Next.js App Router',
        rationale: 'Maximizes search engine discoverability for grocery keywords while providing instant initial paint times for mobile shoppers.'
      },
      {
        decision: 'Client-Side Persistent Cart State',
        rationale: 'Allows shoppers to add grocery items across aisles without page reloads or loss of basket state during network interruptions.'
      }
    ],
    seo: {
      metaTitle: 'Manoj Traders — E-commerce Client Project | Satyesh Kumar',
      metaDescription: 'Production e-commerce storefront engineered by Satyesh Kumar for Manoj Traders, featuring organic Kirana catalog aisles, cart management, and Clerk auth.',
      keywords: ['Manoj Traders', 'E-commerce Client Project', 'Next.js E-commerce', 'Full Stack Developer', 'Kirana Supermarket', 'Satyesh Kumar'],
      ogImage: '/projects/manoj-traders/cover.png',
      canonicalUrl: 'https://satyesh.dev/projects/ecommerce-client'
    },
    featured: true,
    status: 'published',
    order: 2,
  },
  {
    _id: 'proj-3',
    title: 'Career Sathi – Career Recommendation System',
    slug: 'career-sathi-recommendation-system',
    shortDescription: 'A career recommendation platform featuring 45+ assessment questions, 4 evaluation categories, and 10+ career stream recommendations.',
    category: 'Interactive Web Platform',
    projectType: 'Recommendation Platform',
    clientProject: false,
    problem: 'Students and learners struggle to choose suitable career paths due to lack of structured aptitude evaluation and psychometric guidance.',
    goal: 'Provide an interactive self-assessment engine that evaluates students across key competency pillars and generates actionable career guidance.',
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
