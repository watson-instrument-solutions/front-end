import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import '../Styles/navbar.css'
import { NavLink } from 'react-router-dom';
import { useLogout } from '../functions/logout';
import { useUserContext } from '../functions/useUserContext';

function Header() {
    const { logout } = useLogout()
    const { user } = useUserContext()

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
                {!user && ( <div className='d-flex'>
                <Nav.Link to='/login' as={NavLink}>
                    Login
                </Nav.Link>
                <Nav.Link to='/register' as={NavLink}>
                    Register
                </Nav.Link>
                </div>)}
                {user && ( <div>
                <Nav.Link to='/dashboard' as={NavLink}>
                    Dashboard
                </Nav.Link>
                </div>)}
                <Nav.Link to='/contact-us' as={NavLink}>
                    Contact
                </Nav.Link>
                { user && (<div className='d-flex justify-content-center'>
                    <Button className='border-0'
                    style={{ backgroundColor: '#a6bcd6', color: 'white' }} 
                    onClick={handleClick}>Log out</Button>
                </div>)}
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header