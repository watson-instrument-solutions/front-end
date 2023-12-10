import { Button, Card, Container, FormControl, InputGroup } from 'react-bootstrap'
import '../Styles/login.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { login } from '../functions/login';

function Login() {

  const [jwt, setJwt] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(`JWT value is:\n${jwt}`);
  }, [jwt])




  return (
    <div className='login_page'>
      <Container className='login_container flex-column'>
        <h1 className='login_text'>Log in</h1>
      <Card className='login_card border-0'>
        <InputGroup className='mb-3 flex-column' size='lg'>
            <FormControl style={{ margin: 'auto', width: '60%', marginBottom: '40px' }} 
            placeholder='email'
            type='input'
            id='emailInput'
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
            <FormControl style={{ margin: '0 auto', width: '60%', marginBottom: '40px' }} 
            placeholder='password'
            type='password'
            id='passwordInput'
            value={password}
            onChange={event => setPassword(event.target.value)}
            />
             <div className='d-flex justify-content-center'>
          <Button className='button border-0'style={{ backgroundColor: '#a6bcd6', color: 'white' }}
          onClick={() => {login(email, password)}}>
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