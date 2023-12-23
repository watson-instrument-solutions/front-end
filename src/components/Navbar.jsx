import { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import '../Styles/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../functions/logout';
import { useUserContext } from '../functions/useUserContext';
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import CartContext from '../context/CartContext';

// return navbar content
function Header() {
    const { logout } = useLogout()
    const { user } = useUserContext()
    const { cartState } = useContext(CartContext);
    const navigate = useNavigate()
    // console.log (`Current Cart State`, cartState);

    // Calculate the total number of items in the cart
    const totalItems = cartState.cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('Total Items:', totalItems);
    const handleClick = () => {
        logout()
    }

    
    return (
    
    <Navbar className='wisGrey mb-4 shadow'
    sticky='top'>
      <Container fluid>
        <Nav>
          {/* navbar links */}
          <Nav.Link to='/' as={NavLink}>
            Home
          </Nav.Link>
          {/* hire page */}
          <Nav.Link to='/equipment' as={NavLink}>
            Hire
          </Nav.Link>
          {/* contact page */}
          <Nav.Link to='/contact-us' as={NavLink}>
            Contact
          </Nav.Link>
          {/* conditional render of login and register page links
          if no user logged in */}
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
          {/* conditional render of user dashboard link if user is
          logged in */}
          {user && (
            <Nav.Link to='/dashboard' as={NavLink}>
              Dashboard
            </Nav.Link>
          )}
          {/* conditional render of admin portal link if admin is logged in
          incomplete*/}
          {/* {user.admin && (
            <Nav.Link to='/admin-portal' as={NavLink}>
              Admin
            </Nav.Link>
          )} */}
        </Nav>
        <div className='ml-auto'>
          {/* conditional render of cart icon and logout button if user
          is logged in */}
          {user && (
            <div className='logout_div'>
              {/* cart icon */}
              <Button
                className='border-0 rounded-circle'
                style={{ marginRight: '1.6em', width: '3em', height: '3em', backgroundColor: '#3db983', color: 'white' }}
                onClick={() => navigate('/confirm')}
                ><ShoppingCartCheckoutOutlined/>
                <div className='rounded-circle d-flex justify-content-center
                align-items-center'
                style={{backgroundColor: '#d62150', color: 'white', width: '1.2em', height: '1.2em',
                position: 'absolute', bottom: 0, right: 118}}
                >
                <span>{totalItems}</span>
                </div>
              </Button>
              {/* logout button */}
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