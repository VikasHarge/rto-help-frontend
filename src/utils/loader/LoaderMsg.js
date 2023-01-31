import React from 'react'
import {Dna} from 'react-loader-spinner'
import './loader.css'

const LoaderMsg = ({msg}) => {
  return (
    <div className='loader_div' >
        <h2 className='loading_header' >{msg}</h2>
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

export default LoaderMsg