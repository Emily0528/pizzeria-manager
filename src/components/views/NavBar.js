import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="rounded my-3">
      <Container>
        {/* Lewa strona – nazwa aplikacji */}
        <Navbar.Brand href="#">Waiter.app</Navbar.Brand>

        {/* Prawa strona – linki */}
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;