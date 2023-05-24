import React from 'react'
import { Link, useNavigate /*useLocation*/ } from 'react-router-dom'
import logo from './images/logo.png'
import './CSS/Navbar.css'
import noteContext from '../context/notes/noteContext'

export default function Navbar() {

  // let location = useLocation()
  // useEffect(() => {
  //   // console.log(location.pathname);   // it will give my currnt path
  // }, [location])

  const Navigate = useNavigate()
  const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        Navigate('/sign-in')
  }

  return (
    <nav className='navbar'>
        <div className="nav-logo">
            <Link to="/"><img src= {logo} alt="Failed to load" /></Link>
        </div>
        <ul className='nav-toggle'>
            <li><Link to="/">home</Link></li>
            <li><Link to="/about">about</Link></li>
        </ul>
        <div className="heading">
            <h1>INoteBook - Your digital notebook</h1>
        </div>
          <div className="User"><span>{localStorage.getItem('user')}</span></div>
            {!localStorage.getItem('token') ? <Link to="/sign-in"><button className='nav-btn'>Sign in</button></Link> : 
             <Link to="/sign-in"><button className='nav-btn' onClick={handleLogout}>Logout</button></Link>}
    </nav>
  )
}
