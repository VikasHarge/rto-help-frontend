import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/error/PageNotFound';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Complain from './pages/complain/Complain';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ComplainDetail from './pages/complainDetail/ComplainDetail';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './feature/user/userSlice';
import { ToastContainer } from 'react-toastify';




function App() {

  const dispatch = useDispatch()
  const {isAuthenticated, userData } = useSelector((state)=>state.userDetails)

  useEffect(()=>{
    console.log("loader User runs");
    dispatch(loadUser())
    console.log(userData);
  },[])

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/complain' element={<Complain/>} />
      <Route path='/' element={<Login/>} />
      <Route path="/admin/dashboard" element={<Dashboard/>} />
      <Route path='/admin/complainDetail/:complainId' element={<ComplainDetail/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Footer />
    </>

  );
}

export default App;



