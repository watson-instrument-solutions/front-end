import React from 'react'
import { Button, Card, Container, FormControl, InputGroup } from 'react-bootstrap'
import '../Styles/login.css'
import { NavLink } from 'react-router-dom'

function Login() {
  return (
    <div className='login_page'>
      <Container className='login_container flex-column'>
        <h1 className='login_text'>Log in</h1>
      <Card className='login_card border-0'>
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
             <div className='d-flex justify-content-center'>
          <Button className='button border-0'style={{ backgroundColor: '#a6bcd6', color: 'white' }}>
            Login
          </Button>
        </div>
            <p className='register_text'>
              Or &nbsp;<NavLink to='/register'>Register</NavLink>&nbsp; a new Account</p>
          </InputGroup>
        </Card>
      </Container>
    </div>
  )
}

export default Login