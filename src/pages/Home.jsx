import React from 'react';
import '../Styles/home.css';
import anechoicImg from '../docs/anechoic_unsplash.jpg';
import { Container, Card, Row } from 'react-bootstrap';

function Home() {
  return (
    <Container class='position-relative' className='all_cards'>
      <Row className='mx-2 row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2'>
        <Card className='text mb-3 border-0'>
          <p className='home_text1'>Watson Instrument Solutions is a hire agent for 
          sound and vibration monitoring equipment across Australia.</p>
          <p className='home_text2'>We can deliver the tools you need when you need 
          them, please take a look at our hire catalog for rates and availability.</p>
          <p className='home_text3'>All our units come with NATA calibration 
          certification, software, and associated accessories to ensure you can 
          complete your job with confidence to meet industry specification.</p>
        </Card>
        <Card className='image mb-3 border-0'>
          <img src={anechoicImg} alt='home_img' className='home_img'/>
        </Card>
      </Row>
    </Container>
  )
}

export default Home