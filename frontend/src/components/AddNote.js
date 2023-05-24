import React, {useContext, useState} from 'react'
import './CSS/AddNote.css'
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {

  const {showAlert} = props
  const [Note, setNote] = useState({title: "", description: "", tag: ""})
  const context = useContext(noteContext)
  const {addNote} = context

  const HandleClick = (e) => {
      e.preventDefault();
      addNote(Note.title, Note.description, Note.tag)
      setNote({title: "", description: "", tag: ""})
      showAlert("Success", "Your note has been successfully added")
  }

  const onChange = (e) => {
      setNote({...Note, [e.target.name]: e.target.value})
  }

  return (
      <div className="notes-info">
            <h1>Add a Note</h1>
            <form>
                <div className="tittle">
                  <h4>Title</h4>
                  <input className='input-box' type="text" name="title" value={Note.title} placeholder='Enter your title here' onChange={onChange}/>
                </div>
                <div className="description">
                  <h4>Description</h4>
                  <textarea className='input-description' type="text" name="description" value={Note.description} placeholder='should have atleast 10 characters' onChange={onChange}/>
                </div>
                <div className="tag">
                  <h4>Tag</h4>
                  <input className='input-box' type="text" name="tag" value={Note.tag} placeholder='Enter tag here' onChange={onChange}/>
                </div>
                <button disabled={Note.title.length < 3 || Note.description.length < 10 } onClick={HandleClick}>Add Note</button>
            </form>
    </div>
  )
}
