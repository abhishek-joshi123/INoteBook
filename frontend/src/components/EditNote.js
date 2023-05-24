import React, {useContext, useState} from 'react'
import './CSS/EditNote.css'
import noteContext from '../context/notes/noteContext'


export default function EditNote(props) {

  const {CurrNote, showAlert} = props
  const [Note, setNote] = useState({id: CurrNote._id, etitle: CurrNote.title, edescription: CurrNote.description, etag: CurrNote.tag})
    const context = useContext(noteContext)
    const {editNote, click, setclick} = context

    const HandleClick = (e) => {
        e.preventDefault();
        editNote(Note.id, Note.etitle, Note.edescription, Note.etag)
        setclick(!click)
        showAlert("Success", "Your note has been edited successfully")
      }
      
      const onChange = (e) => {
        setNote({...Note, [e.target.name]: e.target.value})
    }

    const HandlecrossClick = (e) => {
      e.preventDefault();
      if(click){
        setclick(!click)
      }

    }
    
  return (
    <div className="enotes-info ">
      <div className="top">
            <h1>Edit a Note</h1>
      `     <button className='cross' onClick={HandlecrossClick}>&times;</button>
      </div>
      <form>
          <div className="etittle">
            <h4>Title</h4> 
            <input className='einput-box' type="text" name="etitle" value={Note.etitle} placeholder='Enter your title here' onChange={onChange}/>
          </div>
          <div className="edescription">
            <h4>Description</h4>
            <textarea className='einput-description' type="text" name="edescription" value={Note.edescription} placeholder='should have atleast 10 characters' onChange={onChange}/>
          </div>
          <div className="etag">
            <h4>Tag</h4>
            <input className='einput-box' type="text" name="etag" value={Note.etag} placeholder='Enter tag here' onChange={onChange}/>
          </div>
          <button onClick={HandleClick}>Update Note</button>
      </form>
    </div>
  )
}
