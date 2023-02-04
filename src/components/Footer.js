import React from 'react'
import footerLogo from "../media/RTO.png";


const Footer = () => {
  return (
    <>
        <div className='footer-container' >

            <div className='footer_logo_div' >
              <img src={footerLogo} alt="rto/logo" />
              <h3>All rights reserved RTO-Thane 2023</h3>
            </div>
            <div className='credit' >
              Design and Developed By <a href='https://www.linkedin.com/in/vikas-harge/' target='_blank' >Vikas Harge</a>
            </div>

        </div>
    </>
  )
}

export default Footer