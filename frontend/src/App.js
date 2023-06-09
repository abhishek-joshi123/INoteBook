import './App.css';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signin from './components/Signin'; 
import Signup from './components/Signup'; 
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

function App() { 

  useEffect(() => {
    fetch("https://abhishek-joshi.onrender.com")
      .then((res) => res.json())
  },[]);

  const [progress, setprogress] = useState(0)

  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
      setAlert({type: type, message: message})

      setTimeout(() => {
        setAlert(null);
      }, 1500)
  }

  return ( 
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <LoadingBar
            color = '#f11946'
            progress={progress}
          />
          <Alert alert={alert}/>
          <Routes>
            <Route path='/' element = {<Home showAlert = {showAlert} />}></Route>
            <Route path='/about' element = {<About/>}></Route>
            <Route path='/sign-in' element = {<Signin showAlert = {showAlert} setprogress= {setprogress} />}></Route>
            <Route path='/sign-up' element = {<Signup showAlert = {showAlert} setprogress= {setprogress} />}></Route>
            <Route path="*" element = {<Navigate to= "/" />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
