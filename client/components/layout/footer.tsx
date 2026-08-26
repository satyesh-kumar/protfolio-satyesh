'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  ArrowUp,
  Clock,
  MapPin,
} from 'lucide-react';

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const contactEmail = 'satyeshkumar578@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300 dark:bg-[#030712] border-t border-slate-800/80 pt-16 pb-12 transition-colors font-sans select-none">
      {/* Ambient Lighting Spotlights */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-64 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-64 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Callout Strip: Clean & Human CTA */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Have a project in mind? Let&apos;s talk.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
              Available for freelance contracts, custom web applications, and full-stack engineering.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all duration-150"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="https://api.whatsapp.com/send?phone=917307440594&text=Hi%20Satyesh,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noreferrer"
              className="h-10 px-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-150"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Content Grid: Balanced Proportions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 pb-10 border-b border-slate-800/80">
          {/* Brand & Bio (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-black text-base">
                  S
                </div>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                SATYESH<span className="text-cyan-400">.</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium max-w-sm">
              Full Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, and secure RESTful APIs. Full Stack Developer Intern at CodeVirus Security.
            </p>

            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 text-emerald-300 text-xs font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for New Opportunities</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Prayagraj, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Navigation (lg: 2.5 cols -> lg:col-span-3) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-indigo-400" /> Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
              {[
                { name: 'Home Page', href: '/' },
                { name: 'About Satyesh', href: '/about' },
                { name: 'Services & Rates', href: '/services' },
                { name: 'Selected Projects', href: '/projects' },
                { name: 'Experience & History', href: '/experience' },
                { name: 'Contact & Inquiry', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-150 whitespace-nowrap block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Offerings (lg: 3 cols -> lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Engineering Offerings
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
              {[
                'Full-Stack Web Applications',
                'RESTful & GraphQL APIs',
                'High-Conversion E-Commerce',
                'Performance & SEO Optimization',
                'Custom CMS & Admin Portals',
                'Cloud Architecture & DevOps',
              ].map((offering) => (
                <li key={offering}>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors duration-150 flex items-center gap-2 group whitespace-nowrap"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 group-hover:bg-cyan-400 transition-colors shrink-0" />
                    <span>{offering}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> Direct Contact
            </h4>

            {/* Email Box */}
            <div className="space-y-2">
              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-medium text-slate-200 overflow-hidden group hover:border-indigo-500/50 transition-colors shadow-sm">
                <a
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent('Project Inquiry - Satyesh Portfolio')}`}
                  className="px-3 py-2.5 hover:text-cyan-400 transition-colors flex-1 font-mono text-[11px] sm:text-xs"
                  title="Send Direct Email"
                >
                  {contactEmail}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-2.5 border-l border-slate-800 hover:bg-slate-800/90 text-slate-400 hover:text-emerald-400 transition-colors shrink-0 flex items-center justify-center"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {copiedEmail && (
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Avg Response Time */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Avg. response time: &lt; 12 hours</span>
            </div>

            {/* Admin CMS Portal Link */}
            <div className="pt-1">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/70 text-xs font-bold transition-all shadow-sm group"
              >
                <span>Admin CMS Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Social Buttons & Back-to-Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p className="text-center sm:text-left">
            © {currentYear} Satyesh. Crafted for production excellence &amp; speed.
          </p>

          <div className="flex items-center gap-3">
            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/90 transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-800/90 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=917307440594&text=Hi%20Satyesh,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-slate-800/90 transition-all shadow-sm"
                aria-label="WhatsApp Chat"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/90 transition-all shadow-sm"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-slate-800/90 transition-all shadow-sm"
              title="Back to top"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


