import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import './CSS/Signin.css'

export default function Signup(props) {

  const host = process.env.REACT_APP_LOCAL_HOST

    const {showAlert} = props

    let Navigate = useNavigate()
  const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  
  const handleClick = async (e) => {
      e.preventDefault();
      const {name, email, password} = credentials
      const response = await fetch(`${host}/api/auth/createuser`, {

          method: 'POST',
          headers: {
            'content-type': 'application/json',
          }, 
          body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
 
        if(json.success){
            // save the auth-token and redirect
            localStorage.setItem('token', json.authToken)
            Navigate('/')
            showAlert("Success", "Your Account created Successfully")

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
            <h3>Sign up</h3>
            <input type="text" name='name' value={credentials.name}  onChange={onChange} placeholder='Username'/>
            <input type="email" name='email' value={credentials.email}  onChange={onChange} placeholder='Email or mobile phone number'/>
            <input type="password" name='password' value={credentials.password}  onChange={onChange} placeholder='Enter your password'/>
            <input type="password" name='cpassword' value={credentials.cpassword}  onChange={onChange} placeholder='Confirm your password'/>
            <button className='login' onClick={handleClick}>Sign up</button>
            <Link to="/sign-in"><button className='back' >Back to login</button></Link>
        </div>
        <p className='notice'>By logging in you agree to Inotebook's <span>Terms of Service</span> and <span>Privacy Policy</span></p>
    </div>
  )
}
