import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import '../Styles/navbar.css'
import { NavLink } from 'react-router-dom';
import { useLogout } from '../functions/logout';

function Header() {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }
  return (
    <Navbar className='wisGrey mb-4'>
        <Container className='d-flex justify-content-between'>
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
                {/* <div className='d-flex justify-content-center'> */}
                    <Button className='border-0'
                    style={{ backgroundColor: '#a6bcd6', color: 'white' }} 
                    onClick={handleClick}>Log out</Button>
                {/* </div> */}
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header