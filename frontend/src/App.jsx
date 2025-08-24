import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Expense from './components/Expense';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/expense/:id' element={<Expense />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
