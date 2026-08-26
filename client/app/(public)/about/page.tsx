import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Code,
  Shield,
  Cpu,
  Terminal,
  Sparkles,
  GraduationCap,
  Award,
  Trophy,
  CheckCircle2,
  Layers,
  Database,
  Server,
  Globe,
  Wrench,
  BookOpen,
} from 'lucide-react';

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await api.getSettings();

  const technicalSkills = [
    {
      category: 'Languages',
      icon: Terminal,
      skills: ['Java (250+ DSA Problems)', 'JavaScript (ES6+)', 'Python'],
    },
    {
      category: 'Frontend Development',
      icon: Globe,
      skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'Responsive UI'],
    },
    {
      category: 'Backend & APIs',
      icon: Server,
      skills: ['Node.js', 'Express.js', 'REST API Architecture', 'JWT Authentication', 'Bcrypt', 'Role-Based Access (RBAC)'],
    },
    {
      category: 'Databases',
      icon: Database,
      skills: ['MongoDB', 'MongoDB Atlas', 'Mongoose ODM', 'Query Indexing & Modeling'],
    },
    {
      category: 'Tools & Platforms',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render', 'Netlify', 'Clerk'],
    },
    {
      category: 'Core Engineering Concepts',
      icon: Cpu,
      skills: ['Data Structures & Algorithms', 'CRUD Operations', 'API Integration', 'Form Validation', 'Defensive Security'],
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
      institution: 'United University, Prayagraj, Uttar Pradesh',
      duration: '2024 – 2028',
      score: 'CGPA: 8.02 / 10',
      description: 'Core coursework in Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems, Computer Networks, and Full-Stack Web Development.',
    },
    {
      degree: 'Senior Secondary Education (Class XII)',
      institution: 'UP Board',
      duration: '2024',
      score: 'Percentage: 93.8%',
      description: 'Academic focus in Mathematics, Physics, Chemistry, and Computer Science fundamentals.',
    },
  ];

  const achievements = [
    {
      title: 'Institute Rank 30 on GeeksforGeeks',
      year: '2025 – 2026',
      icon: Trophy,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/60',
      desc: 'Achieved Institute Rank 30 through consistent problem-solving and algorithmic mastery with 250+ Data Structures & Algorithms problems solved in Java.',
    },
    {
      title: 'HacktoLearn Hackathon Participant',
      year: '2026',
      icon: Award,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800/60',
      desc: 'Participated in the competitive HacktoLearn Hackathon at KIT Kanpur, collaborating under sprint deadlines to build innovative technical solutions.',
    },
    {
      title: 'Certificate of Excellence in Cybersecurity Quiz',
      year: '2026',
      icon: Shield,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/60',
      desc: 'Awarded by CodeVirus Academy for outstanding performance and theoretical & practical knowledge in cybersecurity concepts.',
    },
    {
      title: 'CyberSafe: Unlocking Digital Defense Strategies',
      year: '2024',
      icon: Shield,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/60',
      desc: 'Certified by CodeVirus Security in modern digital defense techniques, secure software practices, and threat mitigation strategies.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header & Bio */}
      <div className="max-w-4xl space-y-6">
        <Badge variant="accent">
          <Sparkles className="w-3 h-3 mr-1 text-blue-500" /> About Satyesh Kumar
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Full Stack Developer &amp; MERN Stack Engineer
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {settings.bio}
        </p>
      </div>

      {/* Core Engineering Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-4 p-6 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Full-Stack MERN Mastery</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Hands-on expertise developing end-to-end applications with React.js, Node.js, Express.js, and MongoDB. Seamlessly bridging frontend interactivity and backend scalability.
          </p>
        </Card>

        <Card className="space-y-4 p-6 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Security-First Mindset</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Internship experience at CodeVirus Security implementing robust JWT authentication, role-based access control (RBAC), bcrypt hashing, and defensive data validation.
          </p>
        </Card>

        <Card className="space-y-4 p-6 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Algorithmic Problem Solving</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Institute Rank 30 on GeeksforGeeks with 250+ DSA problems solved in Java, bringing disciplined efficiency and optimized computational complexity to web applications.
          </p>
        </Card>
      </div>

      {/* Technical Skills Matrix */}
      <div className="space-y-8 pt-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            TECHNICAL REPERTOIRE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technical Skills &amp; Proficiencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalSkills.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.category} className="p-6 space-y-4 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{cat.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-8 pt-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            ACADEMIC BACKGROUND
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-indigo-500" /> Education &amp; Qualifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <Card key={idx} className="p-7 space-y-4 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <Badge variant="accent" className="w-fit text-xs font-bold">
                  {edu.duration}
                </Badge>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 w-fit">
                  {edu.score}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {edu.institution}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {edu.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements & Certifications */}
      <div className="space-y-8 pt-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            HONORS &amp; MILESTONES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-7 h-7 text-amber-500" /> Achievements &amp; Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-bold">
                      {item.year}
                    </Badge>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Card */}
      <Card className="p-8 md:p-12 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-white/10 shadow-2xl">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest">
            <Terminal className="w-4 h-4" /> Ready for Collaboration
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Looking for a dedicated Full Stack MERN Developer?</h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
            Whether you need custom web applications, responsive user interfaces, secure backend REST APIs, or database architecture — let&apos;s build something exceptional together.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold border-none shadow-lg">
                Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
