import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/dashboard.css';
import { useState, useEffect} from 'react';
import { useUserContext } from '../functions/useUserContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { dispatch } = useUserContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    telephone: '',
    email: '',
    address: '',
  });
  const navigate = useNavigate();
  // handler to format dates to display in current bookings 
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return format(dateObject, 'dd/MM/yyyy');
  };

  // useEffect hook to fetch user data and user bookings on page load
  useEffect(() => {
    // fetch user data
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + "/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        // set retrieved data to user state
        setUserData(data);
        // console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    
    // fetch booking data
    const fetchUserBookings = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + "/booking/my-bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        // set bookings data to state
        setUserBookings(data);
        
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserBookings();
    // set edit button mode to render correctly on page load
    setSaveStatus('success');
  }, []);

  // Handler to toggle edit mode for all fields
  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
    setSaveStatus(null);
  };

  // Handler to update user data
  const saveChanges = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + "/users/update-me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      // set data to state
      setUserData(data);
      // console.log(data);
      
      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      // set button to original state
      setSaveStatus('success');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handler to Delete user account
  const deleteAccount = async () => {
    // Prompt the user for confirmation
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');

    if (!isConfirmed) {
    // User canceled the deletion
    return;
    }
      // validate user then fetch req to server with user id
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
  
        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }
  
        const response = await fetch(process.env.REACT_APP_API_URL + "/users/delete-me", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.jwt}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const data = await response.json();
        // update state
        setUserData(data);
        // call logout from user context to remove user from state and local storage
        dispatch({ type: 'LOGOUT' });
        console.log(data.message);
        // navigate to home page
        navigate('/');
        alert('Account Deleted Successfully!');
        // // just to be sure
        // localStorage.removeItem('user');
        
      } catch (error) {
        console.error('Error deleting user data:', error);
      }
  };

  // Handler to delete a single booking
  const deleteBooking = async (bookingId) => {
    // Prompt the user for confirmation
    const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
  
    if (!isConfirmed) {
    // User canceled the deletion
    return;
    }
      // validate user and fetch req with booking id
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'));
    
          if (!storedUser || !storedUser.jwt) {
            console.error('User or token is missing in localStorage');
            return;
          }
    
          const response = await fetch(process.env.REACT_APP_API_URL + `/booking/delete/${bookingId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch booking');
          }

          // Fetch the updated list of bookings after deletion
          const bookingsResponse = await fetch(
          process.env.REACT_APP_API_URL + "/booking/my-bookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          }
        );

          if (!bookingsResponse.ok) {
            throw new Error('Failed to fetch user bookings');
          }

          const updatedBookings = await bookingsResponse.json();
          // set new bookings list to state
          setUserBookings(updatedBookings);
          // log new bookings
          console.log('Booking deleted successfully:', updatedBookings);
          alert('Booking Deleted Successfully!');
        } catch (error) {
          console.error('Error deleting user booking:', error);
        }
  };
  // useEffect hook to re-render bookings after deleting one
  useEffect(() => {
    console.log('userBookings:', userBookings);
  }, [userBookings]);

  // JSX rendering
  return (
    <div className='dashboard_page'>
    <h1 className='dashboard_text'>Dashboard</h1>
    <div className='dashboard_page mx-2 row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2'>
      {/* user container */}
      <Container className='user_details'>
        <Card className='text mb-3 border-0'>
          <div className='mb-4 d-flex justify-content-center'>
          <Card.Title className='display-6'>My Details</Card.Title>
          </div>
            {/* form fields display user properties from userData state, are read only until edit mode is toggled
            when field data is changed, onChange updates userData state to new field contents  */}
            <InputGroup className='flex-column' size='lg'>
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='first name'
              type='input'
              value={userData.firstName}
              readOnly={!isEditMode}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='last name'
              type='input'
              value={userData.lastName}
              readOnly={!isEditMode}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='business name'
              type='input'
              value={userData.businessName}
              readOnly={!isEditMode}
              onChange={(e) => setUserData({ ...userData, businessName: e.target.value })}
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='telephone'
              type='input'
              value={userData.telephone}
              readOnly={!isEditMode}
              onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='email'
              type='input'
              value={userData.email}
              readOnly={!isEditMode}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='address'
              type='input'
              value={userData.address}
              readOnly={!isEditMode}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </InputGroup>
            {/* button toggles edit mode on first click, and calls save changes handler on second
            sending updated state info to the update user server route */}
            <div className='d-flex justify-content-center'>
              <Button
              className='mb-3 border-0'
              style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
              onClick={isEditMode ? saveChanges : toggleEditMode}>
                {/* if saveStatus state is success, edit text displayed, if not save text is displayed */}
              {saveStatus === 'success' ? 'Edit' : 'Save'}
              </Button>
            </div>
          </Card>
      </Container>
      {/* booking container */}
      <Container>
        <h1 className='bookings_text'>Current Bookings</h1>
        {/* if bookings present in state map over and display booking properties in card
        fields */}
        {Array.isArray(userBookings) && userBookings.map((booking) => (
        <Col key={booking._id} className='mb-4'>
          <Card className='text mb-3 border-0'>
            <Card.Body>
              <Card.Title className='mb-3'>Booking ID: {booking._id}</Card.Title>
              <Card.Text>
              Start Date: {formatDate(booking.startDate)}
              </Card.Text>
              <Card.Text>
              End Date: {formatDate(booking.endDate)}
              </Card.Text>
              <Card.Text>
              Cost: ${booking.totalPrice}
              </Card.Text>
            </Card.Body>
              {/* delete button calls delete handler passing booking id */}
              <Button className='mb-3 border-0' 
              style={{ width: '30%', backgroundColor: 'rgb(241, 209, 214)', color: 'rgb(208, 43, 43)' }}
              onClick={() => deleteBooking(booking._id)}>
              Delete
              </Button>
          </Card>
        </Col>
        ))}
      </Container>
    </div> 
    <div className='d-flex justify-content-center'>
      {/* delete account button calls delete user handler */}
    <Button
      className='border-4'
      style={{ fontWeight: 'bold', marginBottom: '30px', borderColor: 'rgb(208, 43, 43)', color: 'rgb(208, 43, 43)', width: '30%', backgroundColor: 'rgb(241, 209, 214)',}}
      onClick={deleteAccount}>
      Delete Account
    </Button>
  </div>
  </div>
  )
}

export default Dashboard