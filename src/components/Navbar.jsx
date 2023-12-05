import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../Styles/navbar.css'
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar className='wisGrey mb-4'>
        <Container>
            <Nav>
                <Nav.Link to='/' as={NavLink}>
                    Home
                </Nav.Link>
                <Nav.Link to='/equipment' as={NavLink}>
                    Hire Equipment
                </Nav.Link>
                <Nav.Link to='/login' as={NavLink}>
                    Login
                </Nav.Link>
                <Nav.Link to='/register' as={NavLink}>
                    Register
                </Nav.Link>
                <Nav.Link to='/contact-us' as={NavLink}>
                    Contact
                </Nav.Link>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header