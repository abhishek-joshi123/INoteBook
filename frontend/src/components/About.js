import React from 'react'
import './CSS/About.css'
import fb from './images/fb.png'
import insta from './images/insta.png'
import telegram from './images/telegram.png'
import linkedin from './images/linkedin.png'
import { useState } from 'react'


export default function About() {

  const [click, setclick] = useState(false)

  const HandleLinks = () => {
      setclick(!click);
  }
  return (
      <div className='about-container'>
          <div className="about-section">
          <h1>About The Website</h1>
          <p>This is one of the best projects i’ve ever worked on</p>
          <p>This is a online platform for saving your all Notes and you can access them any time</p>
          <p>This website basically performs all the crud operations like create, read, update and delete</p>
        </div>

        <h2 className='About-heading'>My Self</h2>

          <div className="column">
            <div className="About-card">
              <img src="https://www.trickscity.com/wp-content/uploads/2016/11/K0cAXP3.jpg" alt="Abhishek Joshi" />
              <div className="cont">
                <h2>Abhishek Joshi</h2>
                <p className="About-title">Developer & Founder</p>
                <p>I wanted to say how much i just love the new site and i am so appreciative of everyone on the project team. This was truly one of the best projects I’ve ever worked on and I can’t wait to see how it grows.</p>
                <a className='Email' href="https://mail.google.com/mail"  target='_blank'>abhishekjoshi3636829@gmail.com</a>
                <button className="About-btn" onClick={HandleLinks}>Contact</button>
                {click && <div className="About-links">
                  <a href="https://www.facebook.com/profile.php?id=100030508412302" target='_blank' onClick={HandleLinks}><img src={fb} alt="failed to load" /></a>
                  <a href="https://instagram.com/abhi_joshi_19?igshid=MzNlNGNkZWQ4Mg==" target='_blank' onClick={HandleLinks}><img src={insta} alt="failed to load" /></a>
                  <a href="https://telegram.me/Abhishek_Joshi_123" target='_blank' onClick={HandleLinks}><img src={telegram} alt="failed to load" /></a>
                  <a href="https://www.linkedin.com/in/abhishek-joshi-a725a8226" target='_blank' onClick={HandleLinks}><img src={linkedin} alt="failed to load" /></a>
                </div>}
              </div>
          </div>
        </div>
        <footer class="About-footer" >
          <p>&copy; Copyright 2023. All Right Reserved. Made with  By <span>Abhishek.in</span></p>
      </footer>
      </div>
  )
}
