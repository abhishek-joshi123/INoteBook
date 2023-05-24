import React, {useContext} from 'react'
import './CSS/Noteitem.css'
import del from './images/delete.png'
import edit from './images/edit.png'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
    const {note, updateNote, showAlert} = props
    const context = useContext(noteContext)
    const {deleteNote, click, setclick} = context

    const HandleClick = (e) => {
      e.preventDefault();
      if(!click){
        setclick(!click)
      }
      updateNote(note)
    }

    const handledelete = () => {
        deleteNote(note._id)
        showAlert("Success", "Your note has been deleted successfully")
    }

  return (
    <div className='card-item'>
      <div className="card">
        <div className="icons">
            <img src={del} alt="failed" onClick={handledelete}/>
            <img src={edit} alt="failed" onClick={HandleClick}/>
        </div>
        <h4>{note.title}</h4>
        <p>{note.description}</p>
      </div>
    </div>
  )
}
