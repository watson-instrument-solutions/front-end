import React, { useEffect, useState } from 'react';
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
  // const [updatedBooking, setUpdatedBooking] = ({
  //   equipment: [],
  //   startDate:'',
  //   endDate: '',
  //   totalPrice: '',
  // });
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    
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
    setSaveStatus('success');

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
}, []);

// handler to delete selected user
//   Handler to Delete user account
  const deleteUser = async () => {

    // Prompt the user for confirmation
    const isConfirmed = 
    window.confirm
    ('Are you sure you want to delete this user? This will also remove all bookings associated to this user');

    if (!isConfirmed) {
    // User canceled the deletion
    return;
  }
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
        // setUserData(userData)
        
        alert('User Deleted Successfully!');
        
        } catch (error) {
        console.error('Error deleting user data:', error);
    }
  }

  // handler to update equipment
  const updateEquipment = async () => {
    
    console.log('to update', selectedEquipment)
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
      console.log('response', data);
      
      

      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      setSaveStatus('success');
      alert('Equipment updated Successfully!')
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  // handler to add new equipment
  const addEquipment = async () => {
    console.log('to add', selectedEquipment)
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
      console.log('response', data);
      
      

      // Toggle back to read-only mode after saving changes
      setIsEditMode(false);
      setSaveStatus('success');
      
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
    console.log('to delete', selectedEquipment)
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

    console.log('booking to delete', selectedBooking);
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
      console.log('response', data);
      
      

      
      
      alert('Booking deleted Successfully!')
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  }

  // handler to update a booking
  const updateBooking = async () => {
    const updatedBookingData = {
      equipment: selectedBooking.equipment,
      startDate: newStartDate,
      endDate: newEndDate,
      totalPrice: recalculatedPrice,
    };

    console.log('booking to update', updatedBookingData);
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
  

  const handleUserSelect = (userId) => {
    console.log('id', userId)
    const selectedUser = userData.find(user => user._id === userId);
    setSelectedUser(selectedUser);
    console.log('Selected User:', selectedUser);
  };
  
  const handleEquipmentSelect = (equipmentId) => {
    // console.log('id', equipmentId)
    const selectedEquipment = equipmentData.find(equipment => equipment._id === equipmentId);
    setSelectedEquipment(selectedEquipment);
    console.log('Selected Equipment:', selectedEquipment);
  };

  const handleBookingSelect = (bookingId) => {
    
    const selectedBooking = bookingData.find(booking => booking._id === bookingId);
    setSelectedBooking(selectedBooking);
    console.log('Selected Booking:', selectedBooking);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const equipmentNameDisplay = (equipmentData, equipmentIds) => {
    const equipmentNames = equipmentIds.map((equipmentId) => {
      const equipment = equipmentData.find((item) => item._id === equipmentId);
      return equipment ? equipment.itemName : 'Equipment not found';
    });
  
    return equipmentNames.join(', '); // Join multiple equipment names with a comma
  };

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

  const handleRecalculatePrice = () => {
    console.log('equipment data', selectedBooking);
  
    // Extract the array of equipment IDs from selectedBooking
    const equipmentIds = selectedBooking.equipment.map(equipment => equipment);
    console.log('equipmentIds', equipmentIds);
  
    // Match the equipment IDs with the corresponding equipment objects from equipmentData
    const selectedEquipmentObjects = equipmentIds.map(id => equipmentData.find(equipment => equipment._id === id));
    console.log('equipment object', selectedEquipmentObjects)
    // Call the calculateTotalPrice function with the array of equipment objects
  calculateTotalPrice(selectedEquipmentObjects, newStartDate, newEndDate)
  .then(calculatedPrice => {
    // Update the state with the calculated result
    setRecalculatedPrice(calculatedPrice);
    console.log('Recalc Price', calculatedPrice);
  })
  .catch(error => {
    console.error('Error calculating total price:', error.message);
    // Handle the error appropriately (e.g., show an error message to the user)
  });
  };

  return (
    <div className='admin_page'>
    <h1 className='admin_text'>Admin Portal</h1>
    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3'>
      <Container className='users'>
        <Card className='text mb-3 border-0'>
          <div className='mb-4 d-flex justify-content-center'>
          <Card.Title className='display-6'>Users</Card.Title>
          </div>
          <Dropdown className='mb-4'
          onSelect={(userId) => handleUserSelect(userId)}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Select a user
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
              {userData && userData.length > 0 ? (
                userData.map(user => (
                  <Dropdown.Item 
                  key={user.id}
                  eventKey={user._id}
                  >
                  {`${user.firstName} ${user.lastName} - ${user.businessName}`}
                  </Dropdown.Item>
                      ))
                  ) : (
                  <Dropdown.Item disabled>No users available</Dropdown.Item>
              )}
            </Dropdown.Menu>
            </Dropdown>
          
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
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={deleteUser}
            >
            Delete</Button>
            </div>
        </Card>
    </Container>
    <Container>
      <Col className='mb-4'>
        <Card className='text mb-3 border-0'>
          <Card.Title className='display-6'>Bookings</Card.Title>
            <Card.Body>
            <Dropdown className='mb-4'
          onSelect={(bookingId) => handleBookingSelect(bookingId)}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Select a booking
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
              {bookingData && bookingData.length > 0 ? (
                bookingData.map(booking => (
                  <Dropdown.Item key={booking.id}
                  eventKey={booking._id}
                  >
                  {`${booking._id} - ${formatDate(booking.date)}`}
                  </Dropdown.Item>
                      ))
                  ) : (
                  <Dropdown.Item disabled>No bookings available</Dropdown.Item>
              )}
            </Dropdown.Menu>
            </Dropdown>
              <InputGroup className='flex-column' size='lg'>
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='booking start date'
            type='input'
            value={selectedBooking ? formatDate(selectedBooking.startDate) : ''}
            readOnly
            />
            {editBookingClicked && <div className='new_booking_start'> New Start date: <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='new start date'
            type='date'
            value={newStartDate}
            onChange={(e) => setNewStartDate(e.target.value)}
            readOnly={!isEditMode}
            /></div>} 
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
            <FormControl style={{ margin: 'auto', width: '80%', height: '100%', marginBottom: '40px' }} 
            placeholder='equipment'
            type='input'
            value={selectedBooking ? equipmentNameDisplay(equipmentData, selectedBooking.equipment) : ''}
            readOnly
            />
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
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='total price'
            type='input'
            value={selectedBooking ? `$${selectedBooking.totalPrice}` : ''}
            readOnly
            />
            {editBookingClicked && <div className='recalc_booking_price'>Updated Price:<FormControl style={{ margin: 'auto', width: '80%', marginBottom: '0px' }} 
            placeholder='new price'
            type='input'
            value={recalculatedPrice !== null ? `$${recalculatedPrice}` : ''}
            readOnly={!isEditMode}
            /><Button variant='transparent'
            style={{border: 'solid 1px'}}
            onClick={handleRecalculatePrice}
            >Recalculate</Button></div>}
            </InputGroup>
              
            
            </Card.Body>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={() => {
              setIsEditMode(true); 
              setEditBookingClicked(true)
            }}
            >
            Edit</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={updateBooking}
            >Save</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={deleteBooking}
            >
            Delete</Button>
            </div>
        </Card>
      </Col>
    </Container>
    <Container className='equipment'>
      <Card className='text mb-3 border-0'>
        <div className='mb-4 d-flex justify-content-center'>
        <Card.Title className='display-6'>Equipment</Card.Title>
        </div>
        <Dropdown className='mb-4'
        onSelect={(equipmentId) => handleEquipmentSelect(equipmentId)}>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Select Equipment
          </Dropdown.Toggle>
          <Dropdown.Menu variant='dark'>
          {equipmentData && equipmentData.length > 0 ? (
                equipmentData.map(equipment => (
                  <Dropdown.Item key={equipment.id}
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
        <Button
            className='mb-3 border-0'
            style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
            onClick={isEditMode ? updateEquipment : toggleEditMode}
            >
            {saveStatus === 'success' ? 'Edit' : 'Save'}
            </Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={setIsEditMode}
          >
          Add New
          </Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={addEquipment}
          >
          Save New
          </Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={deleteEquipment}
          >
          Delete</Button>
        </div>
      </Card>
    </Container>
  </div> 
  </div>
  )
}

export default AdminPortal