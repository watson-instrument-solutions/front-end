
import { Card, Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import '../Styles/register.css';
import { useRegister } from '../functions/register';
import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {register, error, isLoading} = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
  };

  return (
    <div className='register_page'>
      <Container className='register_container flex-column'>
        <h1 className='reg_text'>Register</h1>
        <Card className='register_card border-0'>
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
                  Register
                </Button>
                {error && <div className='error'>{error}</div>}
              </div>
            </InputGroup>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default Register