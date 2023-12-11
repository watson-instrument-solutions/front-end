import React from 'react'
import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/dashboard.css';
import { useState, useEffect } from 'react';
import { useUserContext } from '../functions/useUserContext';


function Dashboard() {

  // const { user } = useUserContext(
  // const userDetails = async (user) => {
    
  //   console.log(user);
  // try {
  //   let result = await fetch(
  //     process.env.REACT_APP_API_URL + "/me",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ user._id }),
  //     }
  //   );

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
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='last name'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='business name'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='telephone'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='email'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='address'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            </InputGroup>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>Edit</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>Save Details</Button>
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