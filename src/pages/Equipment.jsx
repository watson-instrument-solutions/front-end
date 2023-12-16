import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup} from 'react-bootstrap';
import '../Styles/equipment.css';
import { useUserContext } from '../functions/useUserContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CircularProgress } from '@mui/material';
import { useDateRange } from '../context/DateRangeContext';
import { HighlightOffOutlined } from '@mui/icons-material';


function Equipment() {

  const { user } = useUserContext();
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availabilityChecked, setAvailabilityChecked] = useState(false)
  const {dateRange, setNewDateRange} = useDateRange();
  const [availableEquipment, setAvailableEquipment] = useState([]);
  const [availabilityCheckedTriggered, setAvailabilityCheckedTriggered] = useState(false);


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
    setAvailableEquipment([]);
  };

  const handleEndDateChange = (event) => {
    setNewDateRange({ ...dateRange, endDate: event.target.value});
    setAvailableEquipment([]);
    setAvailabilityChecked(true);
  };
    
  const checkAvailability = () => {
    if (!availabilityChecked) {
      console.log('No dates selected');
      alert('Please select dates to check availability');
      return;
    }
  
    // Convert date strings to Date objects
    const selectedStartDate = new Date(dateRange.startDate);
    const selectedEndDate = new Date(dateRange.endDate);
  
    if (selectedStartDate > selectedEndDate) {
      console.log('End date must be after start date');
      alert('Start date must be before End date');
      return;
    }
  
    // Initial available array
    console.log('Initial Equipment Data:', equipmentData);
  
    // Filter array
    const availableEquipment = equipmentData.filter((equipment) => {
      console.log('Processing Equipment:', equipment.itemName);
  
      // Check if equipment has bookedDates array; if not, return true
      // console.log('Equipment bookedDates:', equipment.bookedDates);
      if (!Array.isArray(equipment.bookedDates) || equipment.bookedDates.length === 0) {
        console.log('No bookings. Equipment available');
        return true;
      }
  
      // If they have bookedDates, check if there is any overlap with selected dates
      else if (
        equipment.bookedDates.some((booking) => {
          const bookedStartDate = new Date(booking.startDate);
          const bookedEndDate = new Date(booking.endDate);
          return selectedEndDate < bookedStartDate || selectedStartDate > bookedEndDate;
        })
      ) {
        console.log('Booking present but no date overlap. Equipment available');
        return true;
      }
  
      // Check if stock is greater than 0 or supplyCost is greater than 1
      else if (equipment.stock > 0 || equipment.supplyCost > 1) {
        console.log('Date overlap but suffcient stock, or made to order item. Equipment available.');
        return true;
      }
  
      // If none of the conditions are met, return false
      else {
        console.log('Equipment is not available for the selected dates');
        return false;
      }
    });
  
    console.log('Final Available Equipment:', availableEquipment);
    setAvailableEquipment(availableEquipment);
    setAvailabilityCheckedTriggered(true);
  
    console.log('Available Equipment:', availableEquipment);
    console.log('Availability Checked Triggered:', true);
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
                      {availabilityCheckedTriggered && availabilityChecked && !availableEquipment.includes(equipment) && (
                      <Card.Text className='d-flex justify-content-end' style={{ fontSize: 'large', fontWeight: '300' }}>
                        Unavailable&nbsp;
                        <HighlightOffOutlined style={{ fill: 'rgb(208, 43, 43' }} />
                      </Card.Text>
                    )}
                      
                  </Card.Body>
                  <div className='d-flex align-items-end flex-column'>
                  {user && (<Button className='check_avail border-0' 
                  style={{margin: '10px', marginTop: '0px', width: '40%', backgroundColor: '#3db983', color: 'white' }}
                  disabled={availabilityCheckedTriggered && availabilityChecked && !availableEquipment.includes(equipment)}
                  >
                  Add to Cart</Button>
                  )}
                  {user && (<Button className='check_avail border-0' 
                  style={{margin: '10px', marginTop: '0px', width: '40%', backgroundColor: '#d62150', color: 'white' }}
                  disabled={availabilityCheckedTriggered && availabilityChecked && !availableEquipment.includes(equipment)}
                  >Remove</Button>)}
                  </div>
                </Card>
              </Col>
              ))}
        </div>
      </Container>
  
      <Container className='booking_dates'>
        <div className='dates_container'>
          <p className='dates_title'>Select dates to check availability</p>
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
          <Button 
          className='add_cart border-0' 
          style={{ margin: '10px', width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={checkAvailability}
          >
          Check Availability
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Equipment