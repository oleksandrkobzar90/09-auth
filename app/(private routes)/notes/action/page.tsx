import { redirect } from 'next/navigation';

const RedirectPage = () => {
  redirect('/notes/action/create');
};

export default RedirectPage;
