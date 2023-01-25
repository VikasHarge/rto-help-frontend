import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './nav.css'

const Navbar = () => {

  const navigate = useNavigate()


  return (
    <div className='nav-container' >
        <h1 className='nav_logo' onClick={()=>navigate('/')} >RTO-Thane</h1>
        <div>
            <Link to='/' >Login</Link>
        </div>
    </div>

  )
}

export default Navbar