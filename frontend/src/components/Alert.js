import React from 'react'
import './CSS/Alert.css'

export default function Alert(props) {
  const {alert} = props;
  return (
    <div>
      {alert && <div className={`${alert.type}`}>
          <h2>{alert.type}</h2> 
          <p>{alert.message}</p>
      </div>}
    </div>
  ) 
}