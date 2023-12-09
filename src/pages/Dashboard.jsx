import React from 'react'
import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/dashboard.css';


function Dashboard() {
  return (
    <>
    <h1 className='dashboard_text'>Dashboard</h1>
    <div className='dashboard_page'>
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
  </>
  )
}

export default Dashboard