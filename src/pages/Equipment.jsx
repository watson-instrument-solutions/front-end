import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup} from 'react-bootstrap';
import '../Styles/equipment.css';
import { useUserContext } from '../functions/useUserContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CircularProgress } from '@mui/material';
import { useDateRange } from '../context/DateRangeContext';


function Equipment() {

  const { user } = useUserContext();
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availabilityChecked, setAvailabilityChecked] = useState(false)
  const {dateRange, setNewDateRange} = useDateRange();


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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    };
    fetchEquipment();
    
  }, []);

  const handleStartDateChange = (event) => {
    setNewDateRange({ ...dateRange, startDate: event.target.value});
  };

  const handleEndDateChange = (event) => {
    setNewDateRange({ ...dateRange, endDate: event.target.value});
  };
    
  const checkAvailability = () => {
    // Convert date strings to Date objects
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    const availableEquipment = equipmentData.filter((equipment) => {
      const isAvailable = equipment.stock >= 1 && 
      !equipment.bookedDates.some((date) => {
        const bookedDate = new Date(date);
        return bookedDate > startDate && bookedDate < endDate;
      });
      return isAvailable;
    })

    setAvailabilityChecked(true);

    console.log('Available Equipment:', availableEquipment);
    
  };

  return (
    <div className='equipment_page'>
      <Container className='equipment_container'
      >
        <div className='equipment_cards'>
          <h1 className='equipment_title'>Equipment Catalog</h1>
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="inherit" style={{ width: '100px', height: '100px' }} size={100} />
              </div>
            )}
            {Array.isArray(equipmentData) && equipmentData.map((equipment) => (
              <Col className='mb-4' key={equipment._id}> 
                <Card className='equipment_items border-0 shadow'
                style={{width: '100%', height: 'auto'}}>
                  <Card.Img src={equipment.images} alt={equipment.itemName}
                  style={{width: '100%', height: 'auto'}} />
                  <Card.Body>
                    <Card.Title>{equipment.itemName}</Card.Title>
                      <Card.Text>{equipment.description}</Card.Text>

                      {equipment.itemName !== 'Microphone Mast' && (
                      <>
                      <Card.Title>Rates:</Card.Title>
                      <Card.Text className='mb-2'>/day ${equipment.pricePerDay}</Card.Text>
                      <Card.Text className='mb-2'>/week ${equipment.pricePerWeek}</Card.Text>
                      <Card.Text className='mb-2'>/month ${equipment.pricePerMonth}</Card.Text>
                      </>)}

                      {equipment.itemName === 'Microphone Mast' && (
                        <>
                        <Card.Title>Rates:</Card.Title>
                        <Card.Text className='mb-2'>/order ${equipment.supplyCost}
                        </Card.Text>
                        </>
                      )}
                      
                      {availableEquipment.includes(equipment) && (
                      <Card.Text className='d-flex justify-content-end' style={{ fontSize: 'large', fontWeight: '300' }}>
                        Available&nbsp;
                        <CheckCircleOutlineIcon style={{ fill: '#3db983' }} />
                      </Card.Text>
                    )}
                      
                  </Card.Body>
                  <div className='d-flex justify-content-end'>
                  {user && (<Button className='check_avail border-0' 
                  style={{margin: '10px', marginTop: '0px', width: '40%', backgroundColor: '#3db983', color: 'white' }}
                  >
                  Add to Cart</Button>
                  )}
                  </div>
                </Card>
              </Col>
              ))}
        </div>
      </Container>
  
      <Container className='booking_dates'>
        <div className='dates_container'>
          <p className='dates_title'>Enter dates to check availability</p>
          <InputGroup className='mb-3 mr-3 flex-column' size='lg'>
            <FormControl
              style={{ width: '50%', marginBottom: '10px' }}
              placeholder='start date (dd/mm/yyyy)'
              type='date'
              onChange={handleStartDateChange}
            />
            <FormControl
              style={{ width: '50%', marginBottom: '10px' }}
              placeholder='end date (dd/mm/yyyy)'
              type='date'
              onChange={handleEndDateChange}
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