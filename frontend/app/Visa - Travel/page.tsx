import type { Metadata } from 'next';
import EnhancedContentPage from '../../components/EnhancedContentPage';

export const metadata: Metadata = {
  title: 'Visa & Travel | EduMindz Global',
  description: 'Explore visa, passport, insurance, travel and accommodation assistance.',
};

export default function Page() {
  return <EnhancedContentPage slug="visa-and-travel" />;
}
