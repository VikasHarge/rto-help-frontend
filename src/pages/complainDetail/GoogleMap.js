import React from 'react'

const GoogleMap = ({lat, long}) => {




  return (
    <div className='map_wrapper' >

        <iframe src={`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`} ></iframe>


    </div>
  )
}

export default GoogleMap