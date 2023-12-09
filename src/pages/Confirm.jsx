import React from 'react';
import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/confirm.css';

function Confirm() {
  return (
    <div className='confirm_page'>
    <h1 className='confirm_text'>Confirmation</h1>
    <div className='dashboard_page mx-2 row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2'>
      <Container className='booking_details'>
        <Card className='text mb-3 border-0'>
          <div className='mb-4 d-flex justify-content-center'>
          <Card.Title className='display-6'>Booking</Card.Title>
          </div>
          <Card.Body>
              <Card.Title>booking</Card.Title>
              <Card.Text>booking.dates</Card.Text>
              <Card.Text>booking.equipment</Card.Text>
          </Card.Body>
        </Card>
    </Container>
    <Container>
      <Col className='mb-4'>
        <Card className='text mb-3 border-0'>
          <div className='details_text mb-3'>Please ensure your details are below are correct before confirmation</div>
            <Card.Body>
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
            </Card.Body>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>Edit</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>Save Details</Button>
            </div>
        </Card>
      </Col>
    </Container>
      
  </div>
    <div className='preconfirm_text'>
      After confirming we will email you the details to your provided email address
    </div>
    <div className='d-flex justify-content-center'>
      <Button className='mb-3 border-0' style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}>CONFIRM BOOKING</Button>
    </div>
  </div>
  )
}

export default Confirm