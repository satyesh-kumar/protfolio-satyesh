import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Calendar,
  Sparkles,
  GraduationCap,
  Award,
  Trophy,
  Shield,
  CheckCircle2,
} from 'lucide-react';

export const revalidate = 60;

export default async function ExperiencePage() {
  const experienceList = await api.getExperience();

  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
      institution: 'United University, Prayagraj, Uttar Pradesh',
      duration: '2024 – 2028',
      score: 'CGPA: 8.02 / 10',
      description: 'Core focus in Data Structures & Algorithms, Object-Oriented Programming (Java), Database Systems, Computer Networks, and MERN Full Stack Development.',
    },
    {
      degree: 'Senior Secondary Education (Class XII)',
      institution: 'UP Board',
      duration: '2024',
      score: 'Percentage: 93.8%',
      description: 'Academic background in Science and Mathematics fundamentals with distinction.',
    },
  ];

  const certifications = [
    {
      title: 'Institute Rank 30 on GeeksforGeeks',
      organization: 'GeeksforGeeks',
      year: '2025 – 2026',
      icon: Trophy,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/60',
      description: 'Achieved Institute Rank 30 on GeeksforGeeks through consistent participation in coding challenges and 250+ Data Structures & Algorithms problems solved in Java.',
    },
    {
      title: 'HacktoLearn Hackathon Participant',
      organization: 'KIT Kanpur',
      year: '2026',
      icon: Award,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800/60',
      description: 'Competed at the HacktoLearn Hackathon at KIT Kanpur, building full-stack collaborative prototypes under strict sprint timeframes.',
    },
    {
      title: 'Certificate of Excellence in Cybersecurity Quiz',
      organization: 'CodeVirus Academy',
      year: '2026',
      icon: Shield,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/60',
      description: 'Recognized by CodeVirus Academy for outstanding proficiency in cybersecurity principles, threat models, and web vulnerabilities.',
    },
    {
      title: 'CyberSafe: Unlocking Digital Defense Strategies',
      organization: 'CodeVirus Security',
      year: '2024',
      icon: Shield,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/60',
      description: 'Completed comprehensive cybersecurity training on defense strategies, secure authentication architectures, and digital asset protection.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <Badge variant="accent">
          <Sparkles className="w-3 h-3 mr-1 text-blue-500" /> Career Journey
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Professional Experience &amp; Milestones
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          Hands-on software development experience, cybersecurity internship at CodeVirus Security, academic qualifications, and verified problem-solving track record.
        </p>
      </div>

      {/* 1. PROFESSIONAL WORK EXPERIENCE */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2">
          <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Work Experience</h2>
        </div>

        <div className="relative border-l-2 border-slate-200/80 dark:border-slate-800 ml-4 pl-6 sm:pl-8 space-y-10">
          {experienceList.map((exp) => (
            <div key={exp._id} className="relative group">
              {/* Timeline node icon */}
              <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>

              <Card className="p-6 sm:p-8 space-y-4 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{exp.role}</h3>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">{exp.company}</p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {exp.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="accent" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* 2. EDUCATION & ACADEMICS */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3 pb-2">
          <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Education</h2>
        </div>

        <div className="relative border-l-2 border-slate-200/80 dark:border-slate-800 ml-4 pl-6 sm:pl-8 space-y-10">
          {education.map((edu, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>

              <Card className="p-6 sm:p-8 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">{edu.institution}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                      {edu.score}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {edu.duration}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {edu.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ACHIEVEMENTS & CERTIFICATIONS */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3 pb-2">
          <Trophy className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Achievements &amp; Certifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <Card key={idx} className="p-6 space-y-3 bg-white dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm ${cert.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-bold">
                      {cert.year}
                    </Badge>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {cert.organization}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    {cert.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
