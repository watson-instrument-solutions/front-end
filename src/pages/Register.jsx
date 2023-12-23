
import { Card, Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import '../Styles/register.css';
import { useRegister } from '../functions/register';
import { useState } from 'react';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {register, error, isLoading} = useRegister();

  // handler for form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
    // return function, log and alert user if passwords do not match
    console.log("Password and confirm password do not match");
    alert("Password and confirm password do not match");
    return;
    }
    await register(email, password);
  };

  // JSX rendering
  return (
    <div className='register_page'>
      {/* register container */}
      <Container className='register_container flex-column'>
        <h1 className='reg_text'>Register</h1>
        <Card className='register_card border-0'>
          {/* handler call */}
          <form onSubmit={handleSubmit}>
            {/* form fields save inputted data to state on change */}
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
                placeholder='password (must be at least 8 characters)'
                type='password'
                id='passwordInput'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControl
                style={{ margin: '0 auto', width: '60%', marginBottom: '40px' }}
                placeholder='confirm password'
                type='password'
                id='confirmPasswordInput'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <div className='d-flex justify-content-center'>
                {/* register button calls handler on submission */}
                <Button
                  disabled={isLoading}
                  type='submit'
                  className='button border-0'
                  style={{ backgroundColor: '#a6bcd6', color: 'white' }}>
                  Register
                </Button>
                </div>
                {/* loading text displays when loading state is set true */}
                <div className='loading_div'>
                  {isLoading && <p className='loading_text'>Loading...</p>}
                </div>
                {/* conditional error message renders if error present in state, message from server 
                displays  */}
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

export default Register