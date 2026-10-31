import type { Metadata } from 'next';
import EnhancedContentPage from '../../components/EnhancedContentPage';

export const metadata: Metadata = {
  title: 'Test Preparation | EduMindz Global',
  description: 'Explore English proficiency and standardised test preparation options.',
};

export default function Page() {
  return <EnhancedContentPage slug="test-preparation" />;
}
