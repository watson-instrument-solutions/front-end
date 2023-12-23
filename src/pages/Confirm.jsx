import { useContext, useEffect, useState } from 'react';
import { Card, Container, Button, InputGroup, FormControl, Col } from 'react-bootstrap';
import '../Styles/confirm.css';
import CartContext from '../context/CartContext'
import { useDateRange } from '../context/DateRangeContext'
import { useNavigate } from 'react-router-dom';
import calculateTotalPrice from '../functions/calculatePrice';

function Confirm() {
  const [totalPrice, setTotalPrice] = useState(null);
  const { clearCart } = useContext(CartContext)
  const navigate = useNavigate()
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

  // useEffect to fetch user details to display on page load 
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
    // set save status to ensure correct button text renders on page load
    setSaveStatus('success');
  }, []);

  // Handler to toggle edit mode for all fields
  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
    setSaveStatus(null);
  };

  // Handler to save changes to user fields
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
      // console.log(data);
      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      setSaveStatus('success');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handler to create a new booking
  const createBooking = async () => {
    // validate user
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }
      // create and array of equipment Ids from cart state
      const cartEquipmentIDS = cartState.cartItems.map(item => String(item.id));
      // reformat dates from dates in date state
      const newBookingStartDate = new Date(dateRange.startDate);
      const newBookingEndDate = new Date(dateRange.endDate);
      const formattedStartDate = newBookingStartDate.toLocaleDateString();
      const formattedEndDate = newBookingEndDate.toLocaleDateString();
      
      // fetch req to server with formatted dates, equipmentIDs, and price from state
      const response = await fetch(process.env.REACT_APP_API_URL + "/booking/me/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        body: JSON.stringify({
          equipmentIDs: cartEquipmentIDS,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          totalPrice: totalPrice
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create a booking');
      }

      const data = await response.json();
      // log response
      console.log(data);
      alert('Booking created successfully!');
      // navigate to user dashboard
      navigate('/dashboard');
      // clear items from cart
      clearCart();
      
    } catch (error) {
      console.error('Error creating a booking', error);
    }
  }

  // reformat dates to call in Card
  const newBookingStartDate = new Date(dateRange.startDate);
  const newBookingEndDate = new Date(dateRange.endDate);

  // create and array of equipment IDs from cart state
  const cartEquipmentIDS = cartState.cartItems.map(item => item);
  // console.log(cartEquipmentIDS);

  // useEffect to call calculate total price function on on dates and equipment held in state
  // to display on page load
  useEffect(() => {
    const calculateAndSetTotalPrice = async () => {
      try {
        const result = await calculateTotalPrice(cartEquipmentIDS, startDate, endDate);
        setTotalPrice(result);
      } catch (error) {
        console.error(error.message);
      }
    };

    calculateAndSetTotalPrice(); 

    
  }, [cartEquipmentIDS, startDate, endDate]);

// JSX rendering
  return (
    <div className='confirm_page'>
    <h1 className='confirm_text'>Confirmation</h1>
    <div className='dashboard_page mx-2 row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2'>
      {/* booking details container */}
      <Container className='booking_details'>
        <Card className='text mb-3 border-0'>
          <div className='mb-4 d-flex justify-content-center'>
            <Card.Title className='display-6'>Booking</Card.Title>
          </div>
          <Card.Body>
            <Card.Title>Details</Card.Title>
            {/* call dates from state to render in card fields */}
            <Card.Text className='mb-2'>Start Date: {newBookingStartDate.toDateString()}</Card.Text>
            <Card.Text>End Date: {newBookingEndDate.toDateString()}</Card.Text>
            {/* map over items held in cart context state and display their item name 
            and quantity in cart */}
            {cartState.cartItems.map(item => 
            <div key={item.id}>
              <Card.Text className='mb-1'>{item.itemName} </Card.Text>
              <Card.Text className='mb-4'>quantity: {item.quantity}</Card.Text>
            </div>
            )}
            {/* render total price from calculated price called in useEffect hook */}
            <Card.Text>Total Price: ${totalPrice}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
      {/* user details container */}
      <Container>
        <Col className='mb-4'>
          <Card className='text mb-3 border-0'>
            <div className='details_text mb-3'>Please ensure your details are correct before confirmation</div>
              <Card.Body>
              {/* form fields display user properties from userData state, are read only until edit mode is toggled
              when field data is changed, onChange updates userData state to new field contents  */}
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
                {/* button toggles edit mode on first click, and calls save changes handler on second
                sending updated state info to the update user server route */}
                <Button
                className='mb-3 border-0'
                style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
                onClick={isEditMode ? saveChanges : toggleEditMode}>
                {/* if saveStatus state is success, edit text displayed, if not save text is displayed */}
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
      {/* confirm button calls handler to send data to create booking 
      server route */}
      <Button className='mb-3 border-0' 
      style={{ width: '30%', backgroundColor: '#a6bcd6', color: 'white' }}
      onClick={createBooking}>
      CONFIRM BOOKING
      </Button>
    </div>
  </div>
  )
}

export default Confirm