import type { Metadata } from 'next';
import EnhancedContentPage from '../../components/EnhancedContentPage';

export const metadata: Metadata = {
  title: 'About EduMindz Global',
  description: 'Learn about EduMindz Global and its education, training and career guidance services.',
};

export default function Page() {
  return <EnhancedContentPage slug="about-us" />;
}
