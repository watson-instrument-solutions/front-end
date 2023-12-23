import React from 'react'
import { Card, Container } from 'react-bootstrap';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../Styles/contact.css';

function Contact() {
  // JSX rendering
  return (
    <>
    <div className='top_text'>For any servicing queries or anything related to your booking, 
    please contact us directly via the details below</div>
    {/* contact card container */}
    <Container className='contact_content shadow'>
      <Card className='contact_card border-0'>
        <h1 className='contact_title'>Contact Us</h1>
        <h2 className='name'>Kate O'Sullivan</h2>
        <h2 className='tel'>Phone: 0421 184 174</h2>
        <h2 className='email'>Email: info@watsonis.com.au</h2>
        {/* facebook link using MUI icons */}
        <a href="https://www.facebook.com/watson.noise" target="_blank" rel="noreferrer" className="fb">
          <FacebookIcon fontSize='large'/>
        </a>
      </Card>
    </Container>
    </>
  )
}

export default Contact