import css from '@/components/CreateNote/CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub — Organize Your Notes Efficiently',
  description:
    'NoteHub is a simple and efficient note management app for creating, editing, organizing, and searching personal notes anytime and anywhere.',
  openGraph: {
    title: `NoteHub — Organize Your Notes Efficiently`,
    description:
      'NoteHub is a simple and efficient note management app for creating, editing, organizing, and searching personal notes anytime and anywhere.',
    url: `https://08-zustand-sandy-two.vercel.app/notes/action/create`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub — Organize Your Notes Efficiently',
      },
    ],
    type: 'article',
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
