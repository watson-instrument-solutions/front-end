import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/confirm.css';
import CartContext from '../context/CartContext'
import { useDateRange } from '../context/DateRangeContext'

function Confirm() {

  const { dateRange } = useDateRange();
  const {startDate, endDate } = dateRange;
  const { cartState } = useContext(CartContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    telephone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + "/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    setSaveStatus('success');
  }, []);

  // Handler to toggle edit mode for all fields
  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
    setSaveStatus(null);
  };

  // Handler to save changes
  const saveChanges = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + "/users/update-me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
      console.log(data);
      

      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      setSaveStatus('success');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handler to create booking
  const createBooking = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      // create and array of equipment Ids from cart states
      const cartEquipmentIDS = cartState.cartItems.map(item => String(item.id));

      // console.log(cartEquipmentIDS)
      // console.log('Type of startDate:', typeof startDate);
      // console.log(startDate);
      // console.log('Type of endDate:', typeof endDate);
      // console.log(endDate);
      const newBookingStartDate = new Date(dateRange.startDate);
      // console.log(newBookingStartDate);
      const newBookingEndDate = new Date(dateRange.endDate);
      const formattedStartDate = newBookingStartDate.toLocaleDateString();
      // console.log(formattedStartDate);
      const formattedEndDate = newBookingEndDate.toLocaleDateString();
      

      const response = await fetch(process.env.REACT_APP_API_URL + "/booking/me/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        body: JSON.stringify({
          equipmentIDs: cartEquipmentIDS,
          startDate: formattedStartDate,
          endDate: formattedEndDate 
        }),
      });

      // console.log(response)

      if (!response.ok) {
        throw new Error('Failed to create a booking');
      }

      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.error('Error creating a booking', error);
    }
  }

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
            <Card.Title>Details</Card.Title>
              {/* <Card.Text className='mb-2'>Start Date: {startDate.toDateString()}</Card.Text>
              <Card.Text>End Date: {endDate.toDateString()}</Card.Text> */}
                {cartState.cartItems.map(item => 
                  <div key={item.id}>
                  <Card.Text className='mb-1'>{item.itemName} </Card.Text>
                  <Card.Text className='mb-4'>quantity: {item.quantity}</Card.Text>
                  </div>
                )}
          </Card.Body>
        </Card>
    </Container>
    <Container>
      <Col className='mb-4'>
        <Card className='text mb-3 border-0'>
          <div className='details_text mb-3'>Please ensure your details are correct before confirmation</div>
            <Card.Body>
            <InputGroup className='flex-column' size='lg'>
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='first name'
            type='input'
            value={userData.firstName}
            readOnly={!isEditMode}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='last name'
            type='input'
            value={userData.lastName}
            readOnly={!isEditMode}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='business name'
            type='input'
            value={userData.businessName}
            readOnly={!isEditMode}
            onChange={(e) => setUserData({ ...userData, businessName: e.target.value })}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='telephone'
            type='input'
            value={userData.telephone}
            readOnly={!isEditMode}
            onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='email'
            type='input'
            value={userData.email}
            readOnly={!isEditMode}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='address'
            type='input'
            value={userData.address}
            readOnly={!isEditMode}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
            </InputGroup>
            </Card.Body>
            <div className='d-flex justify-content-center'>
            <Button
            className='mb-3 border-0'
            style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={isEditMode ? saveChanges : toggleEditMode}
            >
            {saveStatus === 'success' ? 'Edit' : 'Save'}
            </Button>
            </div>
        </Card>
      </Col>
    </Container>
      
  </div>
    <div className='preconfirm_text'>
      After confirmation we will send the details to your provided email address
    </div>
    <div className='d-flex justify-content-center'>
      <Button className='mb-3 border-0' 
      style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
      onClick={createBooking}
      >CONFIRM BOOKING</Button>
    </div>
  </div>
  )
}

export default Confirm