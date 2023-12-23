import { useEffect, useState } from 'react';
import { Card, Container, Button, InputGroup, FormControl, Col, Dropdown } from 'react-bootstrap';
import '../Styles/adminportal.css';
import calculateTotalPrice from '../functions/calculatePrice';

function AdminPortal() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [equipmentData, setEquipmentData] = useState({
    itemName: '',
    description: '',
    images: '',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    stock: '',
    supplyCost: '',
    bookedDates:[],
  });
  const [selectedEquipment, setSelectedEquipment] = useState({
    itemName: '',
    description: '',
    images: '',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    stock: '',
    supplyCost: '',
    bookedDates:[],
  });
  const [bookingData, setBookingData] = useState({
    equipment: [],
    startDate: '',
    endDate: '',
    totalPrice: '',
  });
  const [selectedBooking, setSelectedBooking] = useState({
    equipment: [],
    startDate: '',
    endDate: '',
    totalPrice: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [editBookingClicked, setEditBookingClicked] = useState(false)
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [recalculatedPrice, setRecalculatedPrice] = useState();
  
  // useEffect hook to fetch users, bookings, and equipment to provide to 
  // dropdown menus on page load. 
  useEffect(() => {
    // fetch users
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + "/users/all", {
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
        setUserData(data.user);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    
    // fetch equipment
    const fetchEquipmentData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + "/equipment/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch equipment list');
        }

        const data = await response.json();
        setEquipmentData(data);
        console.log('Equipment', data);
      } catch (error) {
        console.error('Error fetching equipment list:', error);
      }
    };

    fetchEquipmentData();
    

    // fetch bookings
    const fetchBookingData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }

        const response = await fetch(process.env.REACT_APP_API_URL + "/booking/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch booking list');
        }

        const data = await response.json();
        setBookingData(data);
        console.log('Equipment', data);
      } catch (error) {
        console.error('Error fetching equipment list:', error);
      }

      
    };
      fetchBookingData();
      // set save button status to ensure button renders in non-editmode on page load
      setSaveStatus('success');
}, []);

// handler to delete selected user
  const deleteUser = async () => {
    // Prompt the user for confirmation
    const isConfirmed = 
    window.confirm
    ('Are you sure you want to delete this user? This will also remove all bookings associated with this user');

    if (!isConfirmed) {
    // User canceled the deletion
    return;
  }
    // send deletion request to back-end route
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
  
        if (!storedUser || !storedUser.jwt) {
          console.error('User or token is missing in localStorage');
          return;
        }
  
        const response = await fetch(process.env.REACT_APP_API_URL + "/users/delete/" + selectedUser._id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.jwt}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const data = await response.json();
        
        console.log(data.message);
        
        alert('User Deleted Successfully!');
        
        } catch (error) {
        console.error('Error deleting user data:', error);
    }
  }

  // handler to update equipment fields
  const updateEquipment = async () => {
    // check correct equipment is being sent to server
    console.log('to update', selectedEquipment)
    // validate user and fetch request to back-end route
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + "/equipment/update/" + selectedEquipment._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        body: JSON.stringify(selectedEquipment),
      });

      if (!response.ok) {
        throw new Error('Failed to update equipment details');
      }

      const data = await response.json();
      // check server response
      console.log('response', data);
      
      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      // set edit/save button back to 'edit'
      setSaveStatus('success');
      alert('Equipment updated Successfully!')
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  // handler to add new equipment
  const addEquipment = async () => {
    // log check
    console.log('to add', selectedEquipment)
    // validate user and fetch req to server with new data in body
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + "/equipment/add-new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        body: JSON.stringify(selectedEquipment),
      });

      if (!response.ok) {
        throw new Error('Failed to add equipment details');
      }

      const data = await response.json();
      // log server response
      console.log('response', data);
      
      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      
      alert('Equipment added Successfully!')
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  }

  // handler to delete equipment
  const deleteEquipment = async () => {
    // Prompt the user for confirmation
    const isConfirmed = window.confirm('Are you sure you want to delete this equipment?');

    if (!isConfirmed) {
    // User canceled the deletion
    return;
  }
    // check correct user or deletion
    console.log('to delete', selectedEquipment)
    // validate and fetch req 
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + "/equipment/delete/" + selectedEquipment._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        
      });

      if (!response.ok) {
        throw new Error('Failed to add delete');
      }

      const data = await response.json();
      // log response
      console.log('response', data);
      
      alert('Equipment deleted Successfully!')
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  }

  // handler to delete a booking
  const deleteBooking = async () => {
    // Prompt the user for confirmation
    const isConfirmed = window.confirm('Are you sure you want to delete this booking?');

    if (!isConfirmed) {
    // User canceled the deletion
    return;
  }
    // log booking details
    console.log('booking to delete', selectedBooking);
    // validate user and send fetch req to the server
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + "/booking/admin/delete/" + selectedBooking._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        
      });

      if (!response.ok) {
        throw new Error('Failed to add delete');
      }

      const data = await response.json();
      // log response
      console.log('response', data);
      
      alert('Booking deleted Successfully!')
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  }

  // handler to update a booking
  const updateBooking = async () => {
    // define new booking object to send in fetch body
    const updatedBookingData = {
      equipment: selectedBooking.equipment,
      startDate: newStartDate,
      endDate: newEndDate,
      totalPrice: recalculatedPrice,
    };
    // log to check details
    console.log('booking to update', updatedBookingData);
    // validate and fetch req to server
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.jwt) {
        console.error('User or token is missing in localStorage');
        return;
      }

      const response = await fetch(process.env.REACT_APP_API_URL + "/booking/admin/update/" + selectedBooking._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.jwt}`,
        },
        body: JSON.stringify(updatedBookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking details');
      }

      const data = await response.json();
      // log server response
      console.log('response', data);
      
      alert('Booking updated Successfully!')
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  }
  
  // console.log('Users', userData);
  // console.log('Equipment', equipmentData);

  // Handler to toggle edit mode for all fields
  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
    setSaveStatus(null);
  };
  
  // handler to set selected user to state
  const handleUserSelect = (userId) => {
    // console.log('id', userId)
    const selectedUser = userData.find(user => user._id === userId);
    setSelectedUser(selectedUser);
    // console.log('Selected User:', selectedUser);
  };
  
  // handler to set selected equipment to state
  const handleEquipmentSelect = (equipmentId) => {
    // console.log('id', equipmentId)
    const selectedEquipment = equipmentData.find(equipment => equipment._id === equipmentId);
    setSelectedEquipment(selectedEquipment);
    // console.log('Selected Equipment:', selectedEquipment);
  };

  // handler to set selected booking to state
  const handleBookingSelect = (bookingId) => {
    const selectedBooking = bookingData.find(booking => booking._id === bookingId);
    setSelectedBooking(selectedBooking);
    // console.log('Selected Booking:', selectedBooking);
  };

  // handler to format date display for booking fields
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  // handler to display equipment name (in booking fields) from equipment ids on booking object
  const equipmentNameDisplay = (equipmentData, equipmentIds) => {
    const equipmentNames = equipmentIds.map((equipmentId) => {
      const equipment = equipmentData.find((item) => item._id === equipmentId);
      return equipment ? equipment.itemName : 'Equipment not found';
    });
    // Join multiple equipment names with a comma
    return equipmentNames.join(', '); 
  };

  // handler to update booking equipment list INCOMPLETE

  // const handleNewBookingEquipment = (equipmentId) => {
  //   // Toggle the equipmentId in the selectedEquipmentIds array
  //   setSelectedEquipmentIds((prevIds) => {
  //     const isAlreadySelected = prevIds.includes(equipmentId);
  
  //     if (isAlreadySelected) {
  //       // Remove the item if it's already selected
  //       return prevIds.filter((id) => id !== equipmentId);
  //     } else {
  //       // Add the item if it's not selected
  //       console.log('selected new equipment', selectedEquipmentIds)
  //       return [...prevIds, equipmentId];
  //     }
  //   });
  // };

  
  // handler to recalculate booking price with new selected dates
  // calls calculate price function
  
  // handler to recalculate booking price with new data
  const handleRecalculatePrice = () => {
    // console.log('equipment data', selectedBooking);
  
    // Extract the array of equipment IDs from selectedBooking
    const equipmentIds = selectedBooking.equipment.map(equipment => equipment);
    // console.log('equipmentIds', equipmentIds);
  
    // Match the equipment IDs with the corresponding equipment objects from equipmentData
    const selectedEquipmentObjects = equipmentIds.map(id => equipmentData.find(equipment => equipment._id === id));
    // console.log('equipment object', selectedEquipmentObjects)
    
    // Call the calculateTotalPrice function with the array of equipment objects
    calculateTotalPrice(selectedEquipmentObjects, newStartDate, newEndDate)
    .then(calculatedPrice => {

    // Update the state with the calculated result
    setRecalculatedPrice(calculatedPrice);
    console.log('Recalc Price', calculatedPrice);
  })
  .catch(error => {
    console.error('Error calculating total price:', error.message);
  });
  };

  // JSX rendering
  return (
    <div className='admin_page'>
    <h1 className='admin_text'>Admin Portal</h1>
    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3'>
      {/* users container */}
      <Container className='users'>
        <Card className='text mb-3 border-0'>
          <div className='mb-4 d-flex justify-content-center'>
          <Card.Title className='display-6'>Users</Card.Title>
          </div>
          {/* users dropdown menu */}
            <Dropdown className='mb-4'
            // on selected item pass user id to handler to return object to form fields
            onSelect={(userId) => handleUserSelect(userId)}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Select a user
              </Dropdown.Toggle>
                <Dropdown.Menu variant='dark'>
                  {/* if user data in state map over data and return names and business names to 
                  dropdown list */}
                  {userData && userData.length > 0 ? (
                    userData.map(user => (
                      <Dropdown.Item 
                      key={user.id}
                      eventKey={user._id}>
                      {`${user.firstName} ${user.lastName} - ${user.businessName}`}
                      </Dropdown.Item>))
                      ) : (
                      <Dropdown.Item disabled>No users available</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            {/* form fields for users display user properties from state*/}
            <InputGroup className='flex-column' size='lg'>
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='first name'
              value={selectedUser ? `${selectedUser.firstName}` : ''}
              readOnly
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='last name'
              value={selectedUser ? `${selectedUser.lastName}` : ''}
              readOnly
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='business name'
              value={selectedUser ? `${selectedUser.businessName}` : ''}
              readOnly
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='telephone'
              value={selectedUser ? `${selectedUser.telephone}` : ''}
              readOnly
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='email'
              value={selectedUser ? `${selectedUser.email}` : ''}
              readOnly
              />
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='address'
              value={selectedUser ? `${selectedUser.address}` : ''}
              readOnly
              />
            </InputGroup>
            {/* delete user button delete selected user on click */}
            <div className='d-flex justify-content-center'>
              <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
              onClick={deleteUser}>
              Delete
              </Button>
            </div>
        </Card>
      </Container>
    {/* bookings container */}
    <Container>
      <Col className='mb-4'>
        <Card className='text mb-3 border-0'>
          <Card.Title className='display-6'>Bookings</Card.Title>
            <Card.Body>
            <Dropdown className='mb-4'
            // send selected booking id to handler to update state to display 
            // in booking fields 
            onSelect={(bookingId) => handleBookingSelect(bookingId)}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Select a booking
              </Dropdown.Toggle>
              {/* if booking data in state map over it and display booking id in drop down menu */}
                <Dropdown.Menu variant='dark'>
                  {bookingData && bookingData.length > 0 ? (
                    bookingData.map(booking => (
                      <Dropdown.Item key={booking.id}
                      eventKey={booking._id}
                      >
                      {`${booking._id} - ${formatDate(booking.date)}`}
                      </Dropdown.Item>))
                      ) : (
                      <Dropdown.Item disabled>No bookings available</Dropdown.Item>
                  )}
                </Dropdown.Menu>
            </Dropdown>
            {/* booking fields display booking properties from booking object if held in 
            state */}
            <InputGroup className='flex-column' size='lg'>
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='booking start date'
              type='input'
              value={selectedBooking ? formatDate(selectedBooking.startDate) : ''}
              readOnly
              />
              {/* if edit button clicked display new date fields, could not work out how to make
              edit in place when Im reformatting data from the booking object, ran out of time! */}
              {editBookingClicked && <div className='new_booking_start'> New Start date: <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='new start date'
              type='date'
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              readOnly={!isEditMode}
              /></div>} 
              {/* same with end date */}
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='booking end date'
              type='input'
              value={selectedBooking ? formatDate(selectedBooking.endDate) : ''}
              readOnly
              />
              {editBookingClicked && <div className='new_booking_end'>New End Date: <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='new end date'
              type='date'
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              readOnly={!isEditMode}
              /></div>}
              {/* display equipment names from the equiment ids on the booking object */}
              <FormControl style={{ margin: 'auto', width: '80%', height: '100%', marginBottom: '40px' }} 
              placeholder='equipment'
              type='input'
              value={selectedBooking ? equipmentNameDisplay(equipmentData, selectedBooking.equipment) : ''}
              readOnly
              />
              {/* edit booking equipment field INCOMPLETE */}

              {/* {editBookingClicked && 
                <div className='new_booking_equipment'>
                  New Equipment List:{' '}
                  <FormControl
                    style={{ margin: 'auto', width: '80%', marginBottom: '0px' }}
                    placeholder='equipment'
                    type='input'
                    value={selectedEquipmentIds.map((id) => {
                      const selectedEquipment = equipmentData.find((equipment) => equipment._id === id);
                      return selectedEquipment ? selectedEquipment.itemName : '';
                    }).join(', ')}
                    readOnly={!isEditMode}
                  />
                  <Dropdown className='mb-4' onSelect={(eventKey, event) => handleNewBookingEquipment(eventKey)}>
                    <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                      Add Equipment?
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant='dark'>
                      {equipmentData && equipmentData.length > 0 ? (
                        equipmentData.map((equipment) => (
                          <Dropdown.Item 
                            key={equipment.id} 
                            eventKey={equipment._id}
                          >
                            {`${equipment.itemName}`}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>No equipment available</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              } */}
              {/* display total price from booking object */}
              <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
              placeholder='total price'
              type='input'
              value={selectedBooking ? `$${selectedBooking.totalPrice}` : ''}
              readOnly
              />
              {/* conditionally render recalculated price on edit button click */}
              {editBookingClicked && <div className='recalc_booking_price'>Updated Price:<FormControl style={{ margin: 'auto', width: '80%', marginBottom: '0px' }} 
              placeholder='new price'
              type='input'
              value={recalculatedPrice !== null ? `$${recalculatedPrice}` : ''}
              readOnly={!isEditMode}
              />
              {/* recalculate price button calls calculate price function passing new date values
              and returns price to the field above */}
              <Button variant='transparent'
              style={{border: 'solid 1px'}}
              onClick={handleRecalculatePrice}>
              Recalculate
              </Button>
              </div>}
            </InputGroup>
              
            
            </Card.Body>
            {/* edit mode button updates state to make form fields non-readonly */}
            <div className='d-flex justify-content-center'>
              <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
              onClick={() => {
                setIsEditMode(true); 
                setEditBookingClicked(true)
              }}>
              Edit
              </Button>
            </div>
            {/* save button calls handler to send req to server with new details */}
              <div className='d-flex justify-content-center'>
              <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
              onClick={updateBooking}>
              Save
              </Button>
            </div>
            {/* delete button calls handler to send del req to server */}
            <div className='d-flex justify-content-center'>
              <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
              onClick={deleteBooking}>
              Delete
              </Button>
            </div>
        </Card>
      </Col>
    </Container>
    {/* equipment container */}
    <Container className='equipment'>
      <Card className='text mb-3 border-0'>
        <div className='mb-4 d-flex justify-content-center'>
        <Card.Title className='display-6'>Equipment</Card.Title>
        </div>
        {/* dropdown menu displays equipment objects, on item select call handler to 
        pass properties to state */}
          <Dropdown className='mb-4'
          onSelect={(equipmentId) => handleEquipmentSelect(equipmentId)}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Select Equipment
            </Dropdown.Toggle>
            {/* if equipment objects held in state map over them and display item names 
            in dropdown menu */}
              <Dropdown.Menu variant='dark'>
                {equipmentData && equipmentData.length > 0 ? (
                equipmentData.map(equipment => (
                  <Dropdown.Item 
                  key={equipment.id}
                  eventKey={equipment._id}>
                  {`${equipment.itemName}`}
                  </Dropdown.Item>))
                  ) : (
                  <Dropdown.Item disabled>No equipment available</Dropdown.Item>
                )}
              </Dropdown.Menu>
          </Dropdown>
        {/* form fields display equipment properties from selected equipment object
        held in state. edit mode disables readonly property and when form contents are changed 
        the new data is updated to state*/}
        <InputGroup className='flex-column' size='lg'>
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='item name'
            type='input'
            value={selectedEquipment ? selectedEquipment.itemName : ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, itemName: e.target.value })}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='description'
            type='input'
            value={selectedEquipment ? selectedEquipment.description : ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, description: e.target.value })}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='images'
            type='input'
            value={selectedEquipment ? selectedEquipment.images : ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, images: e.target.value })}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per day'
            type='input'
            value={selectedEquipment ? selectedEquipment.pricePerDay : ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, pricePerDay: e.target.value })}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per week'
            type='input'
            value={selectedEquipment ? selectedEquipment.pricePerWeek : ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, pricePerWeek: e.target.value })}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per month'
            type='input'
            value={selectedEquipment ? selectedEquipment.pricePerMonth : ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, pricePerMonth: e.target.value })}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='stock'
            type='input'
            value={selectedEquipment ? selectedEquipment.stock : ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, stock: e.target.value })}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='supply cost'
            type='input'
            value={selectedEquipment ? selectedEquipment.supplyCost: ''}
            readOnly={!isEditMode}
            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, supplyCost: e.target.value })}
          />
          </InputGroup>
        <div className='d-flex justify-content-center'>
          {/* edit/save button toggles when clicked, setting setting edit mode
          when initially pressed, and calling update handler to send fetch req 
          on second click */}
          <Button
            className='mb-3 border-0'
            style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={isEditMode ? updateEquipment : toggleEditMode}>
            {/* checks saveStatus state to display correct text on button */}
            {saveStatus === 'success' ? 'Edit' : 'Save'}
          </Button>
        </div>
        <div className='d-flex justify-content-center'>
          {/* add new equipment button sets edit mode on and allows user to 
          fill in fields with new equipment data, onChange field property sets new data to state */}
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={setIsEditMode}>
          Add New
          </Button>
        </div>
        <div className='d-flex justify-content-center'>
          {/* Save button calls add equipment handler sending new data from state on the body of the
          server add route */}
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={addEquipment}>
          Save New
          </Button>
        </div>
        <div className='d-flex justify-content-center'>
          {/* Delete button calls delete handler which sends selected equipment id 
          to server delete route */}
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={deleteEquipment}>
          Delete
          </Button>
        </div>
      </Card>
    </Container>
  </div> 
  </div>
  )
}

export default AdminPortal