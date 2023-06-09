import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CSS/Signin.css'
import Spinner from './Spinner'

export default function Signin(props) {

  const host = process.env.REACT_APP_LOCAL_HOST

  const {showAlert, setprogress} = props
  let Navigate = useNavigate()
  const [credentials, setcredentials] = useState({email: "", password: ""})
  const [loading, setloading] = useState(false)

  const handleClick = async (e) => {
      e.preventDefault();
      setloading(true)
      setprogress(30)
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        }, 
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
        setprogress(50)
        const json = await response.json() 
        setprogress(70)
        
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
        setloading(false)
        setprogress(100)
    }

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
      {loading && <Spinner/>}
      {!loading && <div className='signin'>
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
      </div>}
    </>
  )
}
