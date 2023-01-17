import { GetServerSidePropsContext } from 'next';
import Session from '../data/session';
import SignIn from '../views/SignIn';

export function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const helper = new Session(req, res);

  // Redirect to dashboard if the user is signed in
  if (helper.hasSession()) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
}

export default function index() {
  return (
    <SignIn />
  )
}
