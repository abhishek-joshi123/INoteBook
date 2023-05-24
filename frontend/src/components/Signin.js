import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CSS/Signin.css'

export default function Signin(props) {

  const {showAlert} = props
  let Navigate = useNavigate()
  const [credentials, setcredentials] = useState({email: "", password: ""})

  const handleClick = async (e) => {
      e.preventDefault();
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          }, 
          body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json() 

        if(json.success){
            // save the auth-token and redirect
            localStorage.setItem('token', json.authToken)
            localStorage.setItem('user', credentials.email)
            Navigate('/')
            showAlert("Success", "You are logged in Successfully")
        }
        else{ 
          if(json.esuccess){
              showAlert("Error", json.error)
            }
          else{
              showAlert("Error", json.errors[0].msg)
          }
        }
    }

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className='signin'>
        <div className='top-heading'>
            <h1>INoteBook Welcomes You</h1>
        </div>
        <div className="sign">
            <h3>Sign in</h3>
            <input type="email" name='email' value={credentials.email} onChange={onChange} placeholder='Email or mobile phone number'/>
            <input type="password" name='password' value={credentials.password} onChange={onChange} placeholder='Enter your password'/>
            <button className='login' onClick={handleClick}>Sign in</button>
            <p className='para'>New to Inotebook?</p>
            <Link to="/sign-up"><button className='new'>Create new account</button></Link>
            
        </div>
        <p className='notice'>By logging in you agree to Inotebook's <span>Terms of Service</span> and <span>Privacy Policy</span></p>
    </div>
  )
}
