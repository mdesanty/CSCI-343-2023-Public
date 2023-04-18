import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

function ApplicationLayout() {
  const { currentUser, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();

    axios.post('/auth/logout')
      .then(results => {
        localStorage.clear();
        setIsAuthenticated(false);
        navigate('/');
      })
  }

  return (
    <Container id='header'>
      <div className='pt-4 pb-3 ps-2 bg-light rounded-3'>
        <h1 className='fw-bold'>Music Library</h1>
        <span>Manage your songs here!</span>
      </div>
      <Navbar className='bg-dark navbar-dark mb-4'>
        <Nav className='w-50'>
          <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
          {isAuthenticated ? <Nav.Link as={NavLink} to='/songs'>Songs</Nav.Link> : <></>}
        </Nav>
        <Nav className='w-50 justify-content-end'>
          {isAuthenticated ?
          <>
            <div className='d-flex align-items-center me-2'><span className='text-light'>Welcome {currentUser.email}</span></div>
            <Nav.Link as={NavLink} onClick={handleLogout}>Logout</Nav.Link>
          </>
          :
          <>
            <Nav.Link as={NavLink} to='/signup'>Sign up</Nav.Link>
            <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
          </>
          }
        </Nav>
      </Navbar>
      <Outlet />
    </Container>
  );
}

export default ApplicationLayout;