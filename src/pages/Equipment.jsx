import React from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import '../Styles/equipment.css';


function Equipment() {
  return (
    <div className='equipment_page'>
      <Container className='equipment_container'>
        <div className='equipment_cards'>
          <h1 className='equipment_title'>Equipment Catalog</h1>
          <Row className='mx-2'>
            {/* {equipment.map((equipment, i) => ( */}
              <Col md={3} className='mb-4'>
                <Card className='equipment_items border-0'>
                  <Card.Img src='equipment.image' alt='equipment.name' />
                  <Card.Body>
                    <Card.Title>equipment</Card.Title>
                    <Card.Text>description</Card.Text>
                  </Card.Body>
                  <Button className='add_cart border-0' style={{ backgroundColor: '#a6bcd6', color: 'white' }}>Add to Cart</Button>
                </Card>
              </Col>
          </Row>
        </div>
      </Container>
  
      <Container className='booking_dates'>
        <div className='dates_container'>
          <p className='dates_title'>Enter your booking dates to check availability</p>
          <InputGroup className='mb-3 flex-column' size='lg'>
            <FormControl
              style={{ width: '100%', marginBottom: '10px' }}
              placeholder='start date'
              type='input'
            />
            <FormControl
              style={{ width: '100%', marginBottom: '10px' }}
              placeholder='end date'
              type='input'
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  // Handle Enter key press
                }
              }}
            />
          </InputGroup>
        </div>
      </Container>
    </div>
  );
}

export default Equipment