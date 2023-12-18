import React, { useEffect, useState } from 'react';
import { Card, Container, Button, InputGroup, FormControl, Col, Dropdown } from 'react-bootstrap';
import '../Styles/adminportal.css';

function AdminPortal() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

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
        // console.log('Equipment', data);
      } catch (error) {
        console.error('Error fetching equipment list:', error);
      }
    };

    fetchEquipmentData();
    

  }, []);

  console.log('Users', userData);
  console.log('Equipment', equipmentData);

  const handleUserSelect = (userId) => {
    console.log('id', userId)
    const selectedUser = userData.find(user => user._id === userId);
    setSelectedUser(selectedUser);
    console.log('Selected User:', selectedUser);
  };
  
  const handleEquipmentSelect = (equipmentId) => {
    console.log('id', equipmentId)
    const selectedEquipment = equipmentData.find(equipment => equipment._id === equipmentId);
    setSelectedEquipment(selectedEquipment);
    console.log('Selected Equipment:', selectedEquipment);
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
                  <Dropdown.Item key={user.id}
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
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Delete</Button>
            </div>
        </Card>
    </Container>
    <Container>
      <Col className='mb-4'>
        <Card className='text mb-3 border-0'>
          <Card.Title className='display-6'>Bookings</Card.Title>
            <Card.Body>
              <Card.Title className='mb-4'>booking.id</Card.Title>
              <InputGroup className='flex-column' size='lg'>
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='booking start date'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='booking end date'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='equipment'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            </InputGroup>
              <Dropdown className='mb-4'>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Add Equipment
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {/* Add your dropdown menu items here */}
            <Dropdown.Item href="#">Equipment 1</Dropdown.Item>
            <Dropdown.Item href="#">Equipment 2</Dropdown.Item>
            {/* ... */}
            </Dropdown.Menu>
            </Dropdown>
            
            </Card.Body>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Edit</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Save</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Delete</Button>
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
            value={selectedEquipment.itemName}
            readOnly
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='description'
            value={selectedEquipment.description}
            readOnly
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='images'
            value={selectedEquipment.images}
            readOnly
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per day'
            value={`$${selectedEquipment.pricePerDay}`}
            readOnly
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per week'
            value={`$${selectedEquipment.pricePerWeek}`}
            readOnly
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='price per month'
            value={`$${selectedEquipment.pricePerMonth}`}
            readOnly
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='stock'
            value={`available: ${selectedEquipment.stock}`}
            // onChange={event => setSearchInput(event.target.value)}
          />
          <FormControl style={{ margin: 'auto', width: '80%', marginBottom: '40px' }} 
            placeholder='supply cost'
            value={`$${selectedEquipment.supplyCost}`}
            readOnly
          />
          </InputGroup>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Edit</Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Add New</Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Save</Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Button className='mb-3 border-0' style={{ width: '40%', backgroundColor: '#a6bcd6', color: 'white' }}>Delete</Button>
        </div>
      </Card>
    </Container>
  </div> 
  </div>
  )
}

export default AdminPortal