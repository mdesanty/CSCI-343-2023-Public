import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Container id='header'>
      <div className='pt-4 ps-2 bg-light rounded-3'>
        <h1 className='fw-bold'>Mike's Library</h1>
        <span>No membership required!</span>
      </div>
      <Nav className="bg-secondary mb-4">
        <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
        <Nav.Link as={NavLink} to='/authors'>Authors</Nav.Link>
      </Nav>
    </Container>
  );
}

export default Header;