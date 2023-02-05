import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../feature/user/userSlice'
import './nav.css'
import rtologo from '../media/RTO.png'
import { toast, ToastContainer } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuthenticated, logoutLoading, loginError} = useSelector((state)=>state.userDetails)

  const handleLogout = ()=>{
    dispatch(logout())
  }

  useEffect(()=>{
    if(logoutLoading){
      toast.warning("Logging Out");
    }
    if(loginError){
      toast.error(loginError)
    }
  },[logoutLoading, loginError])

  return (
    <div className='nav-container' >
      <ToastContainer />
        <div className='nav_logo' onClick={()=>navigate('/')} >
          <img src={rtologo} />
          <h1>RTO-Thane</h1>
        </div>
        <div className='navbar_login_options' >
            {
              isAuthenticated ? <>
              <button className='nav_logout_btn' onClick={handleLogout} >Logout</button>
              </> 
              : 
              <>
              <button className='nav_login_btn' onClick={()=>navigate('/')} >Login</button>
              </>
            }
        </div>
    </div>

  )
}

export default Navbar