
import type { Metadata } from 'next';
import MindzyChat from '../components/MindzyChat';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduMindz Global | Education & Career Development Consultants',
  description:
    'EduMindz Global offers study abroad counselling, academic coaching, competitive exam preparation, test preparation and career guidance.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://edumindzglobal.com'
  ),
  openGraph: {
    title: 'EduMindz Global | Education & Training Consultants',
    description:
      'Study abroad, academic coaching, test preparation and career guidance.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MindzyChat />
      </body>
    </html>
  );
}
