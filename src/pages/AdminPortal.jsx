import React from 'react';
import { Card, Container, Button, InputGroup, FormControl, Col, Dropdown } from 'react-bootstrap';
import '../Styles/adminportal.css';

function AdminPortal() {
  return (
    <div className='admin_page'>
    <h1 className='admin_text'>Admin Portal</h1>
    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3'>
      <Container className='users'>
        <Card className='text mb-3 border-0'>
          <div className='mb-4 d-flex justify-content-center'>
          <Card.Title className='display-6'>User Details</Card.Title>
          </div>
          <Dropdown className='mb-4'>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Select a user
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {/* Add your dropdown menu items here */}
            <Dropdown.Item href="#">User 1</Dropdown.Item>
            <Dropdown.Item href="#">User 2</Dropdown.Item>
            {/* ... */}
            </Dropdown.Menu>
            </Dropdown>
          
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
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Delete</Button>
            </div>
        </Card>
    </Container>
    <Container>
      <Col className='mb-4'>
        <Card className='text mb-3 border-0'>
          <Card.Title className='display-6'>Bookings for Selected User</Card.Title>
            <Card.Body>
              <Card.Title className='mb-4'>booking.id</Card.Title>
              <InputGroup className='flex-column' size='lg'>
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='booking start date'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='booking end date'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='equipment'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            </InputGroup>
              <Dropdown className='mb-4'>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Add Equipment
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {/* Add your dropdown menu items here */}
            <Dropdown.Item href="#">Equipment 1</Dropdown.Item>
            <Dropdown.Item href="#">Equipment 2</Dropdown.Item>
            {/* ... */}
            </Dropdown.Menu>
            </Dropdown>
            
            </Card.Body>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Edit</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Save</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Delete</Button>
            </div>
        </Card>
      </Col>
    </Container>
    <Container className='equipment'>
      <Card className='text mb-3 border-0'>
        <div className='mb-4 d-flex justify-content-center'>
        <Card.Title className='display-6'>Equipment</Card.Title>
        </div>
        <Dropdown className='mb-4'>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Select Equipment
          </Dropdown.Toggle>
          <Dropdown.Menu>
          {/* Add your dropdown menu items here */}
          <Dropdown.Item href="#">Equipment 1</Dropdown.Item>
          <Dropdown.Item href="#">Equipment 2</Dropdown.Item>
          {/* ... */}
          </Dropdown.Menu>
          </Dropdown>
          
        <InputGroup className='flex-column' size='lg'>
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='item name'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='description'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='images'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per day'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per week'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per month'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='stock'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='supply cost'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
          />
          </InputGroup>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Edit</Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Add New</Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Save</Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Delete</Button>
        </div>
      </Card>
    </Container>
  </div> 
  </div>
  )
}

export default AdminPortal