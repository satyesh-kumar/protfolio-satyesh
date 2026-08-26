import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/ui/smooth-scroll';

export const metadata: Metadata = {
  title: 'Satyesh | Premium Full-Stack Developer & Freelance Engineer',
  description: 'I turn ideas into production-ready web applications. Building high-performance business websites, web apps, and full-stack software.',
  keywords: ['Full-Stack Developer', 'Freelance Web Developer', 'Next.js Engineer', 'Express API', 'React Developer'],
  authors: [{ name: 'Satyesh' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-bg dark:bg-brand-dark-bg text-brand-text dark:text-brand-dark-text min-h-screen font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
