import React from 'react'
import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/dashboard.css';
import { useState, useEffect } from 'react';
import { useUserContext } from '../functions/useUserContext';


function Dashboard() {

  const { userContext } = useUserContext();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    telephone: '',
    email: '',
    address: '',
  });

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
  }, []);


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
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='last name'
            type='input'
            value={userData.lastName}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='business name'
            type='input'
            value={userData.businessName}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='telephone'
            type='input'
            value={userData.telephone}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='email'
            type='input'
            value={userData.email}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='address'
            type='input'
            value={userData.address}
            />
            </InputGroup>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>Edit</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>Save</Button>
            </div>
        </Card>
    </Container>
    <Container>
      <Col className='mb-4'>
        <Card className='text mb-3 border-0'>
          <Card.Title className='display-6'>Current Bookings</Card.Title>
            <Card.Body>
              <Card.Title>booking</Card.Title>
              <Card.Text>booking_dates</Card.Text>
            </Card.Body>
            <Button className='mb-3 border-0' 
            style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>
              Delete
            </Button>
        </Card>
      </Col>
    </Container>
  </div> 
  </div>
  )
}

export default Dashboard