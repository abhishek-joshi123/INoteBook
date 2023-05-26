import React from 'react'
import loading from './images/loading.gif'
import './CSS/Spinner.css'

export default function Spinner() {
  return (
      <div className='Spiner-comp'>
        <div className="spin">
            <img src={loading} alt="loading" />
        </div>
      </div>
  )
}
