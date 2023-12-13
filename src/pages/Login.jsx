import { Button, Card, Container, FormControl, InputGroup } from 'react-bootstrap'
import '../Styles/login.css'
import { useState } from 'react';
import { useLogin } from '../functions/login';
import { NavLink } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    
    try {
      await login(email, password);
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login_page'>
      <Container className='login_container flex-column'>
        <h1 className='login_text'>Log in</h1>
        <Card className='login_card border-0'>
          <form onSubmit={handleSubmit}>
            <InputGroup className='mb-3 flex-column' size='lg'>
              <FormControl
                style={{ margin: 'auto', width: '60%', marginBottom: '40px' }}
                placeholder='email'
                type='email'
                id='emailInput'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormControl
                style={{ margin: '0 auto', width: '60%', marginBottom: '40px' }}
                placeholder='password'
                type='password'
                id='passwordInput'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className='d-flex justify-content-center'>
                <Button
                  disabled={isLoading}
                  type='submit'
                  className='button border-0'
                  style={{ backgroundColor: '#a6bcd6', color: 'white' }}
                >
                  Log in
                </Button>
                
              </div>
              <div className='loading_div'>
                {isLoading && <p className='loading_text'>Loading...</p>}
                </div>
                <p className='register_text'>
                Or &nbsp;<NavLink to='/register'>Register</NavLink>&nbsp; a new Account</p>
                <div className='error_div'>
                {error && <div className='error'>{error}</div>}
              </div>
            </InputGroup>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default Login