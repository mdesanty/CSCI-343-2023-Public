import { Outlet } from 'react-router-dom';
import Unauthenticated from '../components/Unauthenticated';
import useAuth from '../hooks/useAuth';

function AuthenticatedLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ?
        <Outlet />
      :
        <Unauthenticated />
      }
    </>
  );
}

export default AuthenticatedLayout;