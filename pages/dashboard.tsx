import { GetServerSidePropsContext } from 'next'
import Session from '../data/session';
import Dashboard, { DashboardProps } from '../views/Dashboard';

export function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const helper = new Session(req, res);

  // Redirect to sign in if user isn't logged in.
  if (!helper.hasSession()) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: helper.get(),
    }
  };
}

export default function page(props: DashboardProps) {
  return (
    <Dashboard {...props} />
  )
}
