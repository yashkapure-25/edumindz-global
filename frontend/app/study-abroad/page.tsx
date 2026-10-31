import type { Metadata } from 'next';
import EnhancedContentPage from '../../components/EnhancedContentPage';

export const metadata: Metadata = {
  title: 'Study Abroad | EduMindz Global',
  description: 'Explore study destinations, course planning and overseas education application guidance.',
};

export default function Page() {
  return <EnhancedContentPage slug="study-abroad" />;
}
