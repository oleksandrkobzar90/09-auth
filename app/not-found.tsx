import css from '@/components/NotFound/NotFound.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description:
    'The page you are looking for could not be found. Return to NoteHub to continue managing your notes and tasks.',
  openGraph: {
    title: `404 - Page Not Found | NoteHub`,
    description:
      'The requested page does not exist on NoteHub. Explore your notes and continue staying organized.',
    url: '/not-found',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404 Page Not Found',
      },
    ],
    type: 'article',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
