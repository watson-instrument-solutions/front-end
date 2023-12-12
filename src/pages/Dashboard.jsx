import React from 'react'
import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/dashboard.css';
import { useState, useEffect } from 'react';
// import { useUserContext } from '../functions/useUserContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

  // const { userContext } = useUserContext();
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

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return format(dateObject, 'dd/MM/yyyy');
  };

  const navigate = useNavigate();
  

  useEffect(() => {
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
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    setSaveStatus('success');

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
        setUserBookings(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserBookings();
  }, []);

  // Handler to toggle edit mode for all fields
  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
    setSaveStatus(null);
  };

  // Handler to save changes
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
      setUserData(data);
      console.log(data);

      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      setSaveStatus('success');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

    // Handler to Delete bookings
    const deleteAccount = async () => {
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
        setUserData(data);
        console.log(data.message);
        navigate('/');
        alert('Account Deleted Successfully!');
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
  
  };


  return (
    <div className='dashboard_page'>
    <h1 className='dashboard_text'>Dashboard</h1>
    <div className='dashboard_page mx-2 row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2'>
      <Container className='user_details'>
        <Card className='text mb-3 border-0'>
          <div className='mb-4 d-flex justify-content-center'>
          <Card.Title className='display-6'>My Details</Card.Title>
          </div>
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
            <div className='d-flex justify-content-center'>
            <Button
            className='mb-3 border-0'
            style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={isEditMode ? saveChanges : toggleEditMode}
            >
            {saveStatus === 'success' ? 'Edit' : 'Save'}
            </Button>
            </div>
            
            
        </Card>
    </Container>

    <Container>
      <h1 className='bookings_text'>Current Bookings</h1>
      {userBookings.map((booking) => (
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
            <Button className='mb-3 border-0' 
            style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>
              Delete
            </Button>
        </Card>
      </Col>
      ))}
    </Container>
    
  </div> 
  <div className='d-flex justify-content-center'>
    <Button
      className='border-4'
      style={{ marginBottom: '30px', borderColor: 'rgb(208, 43, 43)', color: 'rgb(208, 43, 43)', width: '30%', backgroundColor: 'rgb(241, 209, 214)',}}
      onClick={deleteAccount}
      >
      Delete Account
    </Button>
  </div>
  </div>
  )
}

export default Dashboard