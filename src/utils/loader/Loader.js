import React from 'react'
import {Dna} from 'react-loader-spinner'
import './loader.css'

const Loader = () => {


  return (
    <div className='loader_div' >
        <Dna
            visible = {true}
            height = '80'
            width = '80'
            ariaLabel='dna-loader'
            wrapperStyle={{}}
            wrapperClass='dna-wrapper'
         />
    </div>
  )
}

export default Loader