import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Confirm from './pages/Confirm';
import Equipment from './pages/Equipment';
import AdminPortal from './pages/AdminPortal';
import EditBooking from './pages/EditBooking';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header />
    <Container className='mb-4'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/confirm' element={<Confirm />}/>
        <Route path='/equipment' element={<Equipment />}/>
        <Route path='/admin-portal' element={<AdminPortal />}/>
        <Route path='/edit-booking' element={<EditBooking />}/>
      </Routes>
    </Container>
    </>
  )
    

}

export default App;
