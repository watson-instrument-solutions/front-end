import React from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
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
      <Container fluid>
        <Nav>
          <Nav.Link to='/' as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to='/equipment' as={NavLink}>
            Hire Equipment
          </Nav.Link>
          {!user && (
            <div className='d-flex'>
              <Nav.Link to='/login' as={NavLink}>
                Login
              </Nav.Link>
              <Nav.Link to='/register' as={NavLink}>
                Register
              </Nav.Link>
            </div>
          )}
          {user && (
            <Nav.Link to='/dashboard' as={NavLink}>
              Dashboard
            </Nav.Link>
          )}
        </Nav>
        <div className='ml-auto'>
          {user && (
            <div className='logout_div'>
              <Button
                className='border-3'
                style={{ backgroundColor: 'white', color: '#a6bcd6', borderColor: '#a6bcd6' }}
                onClick={handleClick}
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default Header