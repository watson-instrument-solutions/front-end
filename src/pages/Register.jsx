import React from 'react'
import { Card, Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import '../Styles/register.css'

function Register() {
  return (
    <div className='register_page'>
      <Container className='register_container flex-column'>
        <h1 className='reg_text'>Register</h1>
      <Card className='register_card border-0'>
        <InputGroup className='mb-3 flex-column' size='lg'>
            <FormControl style={{ margin: 'auto', width: '60%', marginBottom: '40px' }} 
            placeholder='email'
            type='input'
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: '0 auto', width: '60%', marginBottom: '40px' }} 
            placeholder='password'
            type='input'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                
              }
            }}
            // onChange={event => setSearchInput(event.target.value)}
            />
            <FormControl style={{ margin: '0 auto', width: '60%', marginBottom: '60px' }} 
            placeholder='confirm password'
            type='input'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                
              }
            }}
            // onChange={event => setSearchInput(event.target.value)}
            />
             <div className='d-flex justify-content-center'>
          <Button className='button border-0'style={{ backgroundColor: '#a6bcd6', color: 'white' }}>
            Register
          </Button>
        </div>
          </InputGroup>
        </Card>
      </Container>
    </div>
  )
}

export default Register