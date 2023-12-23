import { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup} from 'react-bootstrap';
import '../Styles/equipment.css';
import { useUserContext } from '../functions/useUserContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CircularProgress } from '@mui/material';
import { useDateRange } from '../context/DateRangeContext';
import { HighlightOffOutlined } from '@mui/icons-material';
import CartContext from '../context/CartContext';


function Equipment() {
  const { user } = useUserContext();
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availabilityChecked, setAvailabilityChecked] = useState(false)
  const {dateRange, setNewDateRange} = useDateRange();
  const [availableEquipment, setAvailableEquipment] = useState([]);
  const [availabilityCheckedTriggered, setAvailabilityCheckedTriggered] = useState(false);
  const { addToCart, removeFromCart } = useContext(CartContext)

  // useEffect hook to fetch equipment data on page load
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
        // set returned data to state
        setEquipmentData(data);
        console.log(data);
        // set loading state, have not applied loading icon yet
        setLoading(false);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    };
    fetchEquipment();
    
  }, []);

  // handler to set selected start date to state
  const handleStartDateChange = (event) => {
    setNewDateRange({ ...dateRange, startDate: event.target.value});
    // reset available equipment state
    setAvailableEquipment([]);
  };

  // handler to set selected end date range to state
  const handleEndDateChange = (event) => {
    setNewDateRange({ ...dateRange, endDate: event.target.value});
    // reset available equipment state array
    setAvailableEquipment([]);
    // set availability checked state to true to allow check availability button to 
    // be clicked
    setAvailabilityChecked(true);
  };
   
  // function to check item availability
  const checkAvailability = () => {
    // if no dates have been selected, availability checked status is false
    // break function and return alert to user
    if (!availabilityChecked) {
      // console.log('No dates selected');
      alert('Please select dates to check availability');
      return;
    }
  
    // Convert date strings to Date objects
    const selectedStartDate = new Date(dateRange.startDate);
    const selectedEndDate = new Date(dateRange.endDate);
    
    // check if selected dates are valid, return function and alert user if not
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
    // to account for mic masts which are made to order, have no rate charge but a supply cost 
    // (all other items have 0 supply cost)
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
    // set available equipment state
    setAvailableEquipment(availableEquipment);
    // set availability checked to true to allow conditional renders
    setAvailabilityCheckedTriggered(true);
  
    // console.log('Available Equipment:', availableEquipment);
    // console.log('Availability Checked Triggered:', true);
};
  
  // handler to add to cart
  const handleAddToCart = (equipment) => {
    // Destructure the equipment object
    const { _id, stock, itemName, pricePerDay, 
    pricePerWeek, pricePerMonth, supplyCost } = equipment; 
    console.log('Item ID:', _id);
    // call addToCart from cart context
    addToCart({ id: _id, stock, itemName, pricePerDay, 
      pricePerWeek, pricePerMonth, supplyCost  }); 
  };
  
  // handler to remove from cart
  const handleRemoveFromCart = (equipment) => {
    // Destructure the equipment object
    const { _id, stock, itemName, pricePerDay, 
      pricePerWeek, pricePerMonth, supplyCost } = equipment; 
    // console.log('Item ID:', _id);
    // Pass an object with id and stock properties to removeFromCart
    removeFromCart({ id: _id, stock, itemName, pricePerDay, 
      pricePerWeek, pricePerMonth, supplyCost }); 
  }; 
  
  // JSX rendering 
  return (
    <div className='equipment_page'>
      {/* equipment container */}
      <Container className='equipment_container'>
        <div className='equipment_cards'>
          <h1 className='equipment_title'>Equipment Catalog</h1>
          {/* loading MUI icon displays on loading state true */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="inherit" style={{ width: '100px', height: '100px' }} size={100} />
              </div>
            )}
            {/* if equipment data present in state map over and provide properties to card fields */}
            {Array.isArray(equipmentData) && equipmentData.map((equipment) => (
              <Col className='mb-4' key={equipment._id}> 
                <Card className='equipment_items border-0 shadow'
                style={{width: '100%', height: 'auto'}}>
                  <Card.Img src={equipment.images} alt={equipment.itemName}
                  style={{width: '100%', height: 'auto'}} />
                  <Card.Body>
                    <Card.Title>{equipment.itemName}</Card.Title>
                      <Card.Text>{equipment.description}</Card.Text>
                      {/* conditional rendering for mic mast as it has no rate charges, so display rates or all other items */}
                      {equipment.itemName !== 'Microphone Mast' && (
                      <>
                      <Card.Title>Rates:</Card.Title>
                      <Card.Text className='mb-2'>/day ${equipment.pricePerDay}</Card.Text>
                      <Card.Text className='mb-2'>/week ${equipment.pricePerWeek}</Card.Text>
                      <Card.Text className='mb-2'>/month ${equipment.pricePerMonth}</Card.Text>
                      </>)}
                      {/* display supply cost for mic mast */}
                      {equipment.itemName === 'Microphone Mast' && (
                        <>
                        <Card.Title>Rates:</Card.Title>
                        <Card.Text className='mb-2'>/order ${equipment.supplyCost}
                        </Card.Text>
                        </>
                      )}
                      {/* conditional render of MUI check icon if equipment is available */}
                      {availableEquipment.includes(equipment) && (
                      <Card.Text className='d-flex justify-content-end' style={{ fontSize: 'large', fontWeight: '300' }}>
                        Available&nbsp;
                        <CheckCircleOutlineIcon style={{ fill: '#3db983' }} />
                      </Card.Text>
                    )}
                      {/* conditional render of MUI cross icon if item unavailable */}
                      {availabilityCheckedTriggered && availabilityChecked && !availableEquipment.includes(equipment) && (
                      <Card.Text className='d-flex justify-content-end' style={{ fontSize: 'large', fontWeight: '300' }}>
                        Unavailable&nbsp;
                        <HighlightOffOutlined style={{ fill: 'rgb(208, 43, 43' }} />
                      </Card.Text>
                    )}
                  </Card.Body>
                  {/* conditional render of add to and remove from cart buttons is user is logged in and availability
                  has been checked. disabled if availability checked and unavailable */}
                  <div className='d-flex align-items-end flex-column'>
                  {user && availabilityCheckedTriggered && 
                  (<Button className='check_avail border-0' 
                  style={{margin: '10px', marginTop: '0px', width: '40%', backgroundColor: '#3db983', color: 'white' }}
                  disabled={availabilityCheckedTriggered && availabilityChecked && !availableEquipment.includes(equipment)}
                  onClick={() => handleAddToCart(equipment)}>
                  Add to Cart
                  </Button>
                  )}
                  {user && availabilityCheckedTriggered && 
                  (<Button className='check_avail border-0' 
                  style={{margin: '10px', marginTop: '0px', width: '40%', backgroundColor: '#d62150', color: 'white' }}
                  disabled={availabilityCheckedTriggered && availabilityChecked && !availableEquipment.includes(equipment)}
                  onClick={() => handleRemoveFromCart(equipment)}>
                  Remove
                  </Button>)}
                  </div>
                </Card>
              </Col>
              ))}
        </div>
      </Container>
      {/* select dates container */}
      <Container className='booking_dates'>
        <div className='dates_container'>
          <p className='dates_title'>Select dates to check availability</p>
          {/* on date field select, call handler setting selected date to state */}
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
          {/* check avails button calls check availability function with selected dates */}
          <Button 
          className='add_cart border-0' 
          style={{ margin: '10px', width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={checkAvailability}>
          Check Availability
          </Button>
          <p className='checkout_text'>Login or Register to add items to your cart</p>
          <p className='checkout_text'>Checkout to view your booking details</p>
        </div>
      </Container>
    </div>
  );
}

export default Equipment