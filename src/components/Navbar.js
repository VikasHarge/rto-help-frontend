import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../feature/user/userSlice'
import './nav.css'
import rtologo from '../media/RTO.png'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuthenticated} = useSelector((state)=>state.userDetails)

  return (
    <div className='nav-container' >
        <div className='nav_logo' onClick={()=>navigate('/')} >
          <img src={rtologo} />
          <h1>RTO-Thane</h1>
        </div>
        <div className='navbar_login_options' >
            {
              isAuthenticated ? <>
              <button className='nav_logout_btn' onClick={(()=>dispatch(logout()))} >Logout</button>
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