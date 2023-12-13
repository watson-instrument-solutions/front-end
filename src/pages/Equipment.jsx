import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup} from 'react-bootstrap';
import '../Styles/equipment.css';


function Equipment() {

  const [equipmentData, setEquipmentData] = useState([])

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/equipment/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch equipment data');
        }

        const data = await response.json();
        setEquipmentData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    };
    fetchEquipment();
  }, []);
    
  
  return (
    <div className='equipment_page'>
      <Container className='equipment_container'
      >
        <div className='equipment_cards'>
          <h1 className='equipment_title'>Equipment Catalog</h1>
          {/* <Row className='mx-2'> */}
          {Array.isArray(equipmentData) && equipmentData.map((equipment) => (
              <Col className='mb-4' key={equipment._id}>
                <Card className='equipment_items border-0 shadow'
                style={{width: '100%', height: 'auto'}}>
                  <Card.Img src={equipment.images} alt={equipment.itemName}
                  style={{width: '70%', height: 'auto'}} />
                  <Card.Body>
                    <Card.Title>{equipment.itemName}</Card.Title>
                    <Card.Text>{equipment.description}</Card.Text>
                  </Card.Body>
                  <Button className='add_cart border-0' 
                  style={{ margin: '10px',width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
                  >
                  Add to Cart</Button>
                </Card>
              </Col>
              ))}
          {/* </Row> */}
        </div>
      </Container>
  
      <Container className='booking_dates'>
        <div className='dates_container'>
          <p className='dates_title'>Enter your booking dates to check availability</p>
          <InputGroup className='mb-3 mr-3 flex-column' size='lg'>
            <FormControl
              style={{ width: '50%', marginBottom: '10px' }}
              placeholder='start date (dd/mm/yyyy)'
              type='input'
            />
            <FormControl
              style={{ width: '50%', marginBottom: '10px' }}
              placeholder='end date (dd/mm/yyyy)'
              type='input'
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  // Handle Enter key press
                }
              }}
            />
          </InputGroup>
          <Button className='add_cart border-0' 
                  style={{ margin: '10px', width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
                  >
                  Check Availability</Button>
        </div>
      </Container>
    </div>
  );
}

export default Equipment