import React from 'react'
import Notes from './Notes'
import './CSS/Home.css'
import Alert from './Alert'

export default function Home(props) {

  const {showAlert} = props 

  return (
    <div>
        <div className="notes">
          <Notes showAlert = {showAlert}/>
        </div>
    </div>
  )
}
 