// import { GetServerSideProps } from 'next'
import Dashboard from '../views/Dashboard';

// interface PageProps {
//   session: any
// }

// export const getServerSideProps: GetServerSideProps<PageProps> = ({ req, res }) => {

// }

export default function page() {
  return (
    <Dashboard />
  )
}
