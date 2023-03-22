import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Header';


function Layout() {
  return (
    <>
      <Header />
      <Container>
        <div>
          <Outlet />
        </div>
      </Container>
    </>
  );
}

export default Layout;