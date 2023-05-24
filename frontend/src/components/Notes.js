import React, {useContext, useEffect, useState} from 'react'
import './CSS/Notes.css'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import EditNote from './EditNote'
import { useNavigate } from 'react-router-dom'


export default function Notes(props) {

  let Navigate = useNavigate()
  const {showAlert} = props
  const [CurrNote, setCurrNote] = useState({})
  const context = useContext(noteContext)
  const {notes, getNotes, click} = context
  useEffect(() => {

    if(localStorage.getItem('token')){
        getNotes()
    }
    else{
      Navigate('/sign-in')
    }
    // eslint-disable-next-line 
  }, [])

  const updateNote = (Note) => {
    setCurrNote(Note);
  }

  return (
    <div className="container">
        <AddNote showAlert = {showAlert} />
        {click && <EditNote CurrNote = {CurrNote} showAlert = {showAlert} />}
        <div className="notes-comp">    
            <h2>Your Notes</h2>
            {notes.length === 0 && <div className="empty">
                <span>You have no notes to display</span>
            </div>}
            {/* .filter(Boolean) */} 
            {notes.map((note) => {
                return <Noteitem key = {note._id} note = {note} updateNote = {updateNote} showAlert = {showAlert}/>
                })}
        </div>
    </div>
  )
}
