import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import '../Styles/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../functions/logout';
import { useUserContext } from '../functions/useUserContext';
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import CartContext from '../context/CartContext';

function Header() {
    const { logout } = useLogout()
    const { user } = useUserContext()

    const { cartState } = useContext(CartContext);
    console.log (`Current Cart State`, cartState);

    // Calculate the total number of items in the cart
    const totalItems = cartState.cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('Total Items:', totalItems);
    const handleClick = () => {
        logout()
    }

    const navigate = useNavigate()
  return (
    <div className='navbar'>
    <Navbar className='wisGrey mb-4 shadow'>
      <Container fluid>
        <Nav>
          <Nav.Link to='/' as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to='/equipment' as={NavLink}>
            Hire Equipment
          </Nav.Link>
          <Nav.Link to='/contact-us' as={NavLink}>
            Contact
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
              className='border-3 rounded-circle'
              style={{ marginRight: '1em', width: '3em', height: '3em', backgroundColor: 'white', color: '#3db983', borderColor: '#3db983' }}
              onClick={() => navigate('/confirm')}
              ><ShoppingCartCheckoutOutlined/>
              <div className='rounded-circle bg-danger d-flex justify-content-center
              align-items-center'
              style={{color: 'white', width: '1.2em', height: '1.2em',
              position: 'absolute'
              }}
              >
              <span>{totalItems}</span>
              </div>
              
              </Button>
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
    </div>
  )
}

export default Header