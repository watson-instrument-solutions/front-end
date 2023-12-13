import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup} from 'react-bootstrap';
import '../Styles/equipment.css';
import { useUserContext } from '../functions/useUserContext';


function Equipment() {

  const { user } = useUserContext();
  const [equipmentData, setEquipmentData] = useState([]);
  const [availabilityChecked, setAvailabilityChecked] = useState(false)

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
    
  const checkAvailability = () => {
    const isAvailable = equipmentData.some(equipment => equipment.stock >= 1);
    setAvailabilityChecked(true);
    // Set state or perform other actions based on availability if needed
  };

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
                    {availabilityChecked && equipment.stock >= 1 && (<Card.Text>Available</Card.Text>)}
                  </Card.Body>
                  {user && (<Button className='check_avail border-0' 
                  style={{width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
                  >
                  Add to Cart</Button>
                  )}
                </Card>
              </Col>
              ))}
          {/* </Row> */}
        </div>
      </Container>
  
      <Container className='booking_dates'>
        <div className='dates_container'>
          <p className='dates_title'>Enter dates to check availability</p>
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
            />
          </InputGroup>
          <Button className='add_cart border-0' 
                  style={{ margin: '10px', width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
                  onClick={checkAvailability}
                  >
                  Check Availability</Button>
        </div>
      </Container>
    </div>
  );
}

export default Equipment