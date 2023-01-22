import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Navbar = () => {
  return (
    <div className='nav-container' >
        <h1 className='nav_logo' >RTO-Thane</h1>
        <div>
            <Link to='/' >Login</Link>
        </div>
    </div>

  )
}

export default Navbar