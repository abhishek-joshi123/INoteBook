import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

      const host = process.env.REACT_APP_LOCAL_HOST

      const [notes, setnotes] = useState([])
      const [click, setclick] = useState(false)

      // Get all notes...
      const getNotes = async () => {

        //API CALL...
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: { 
          'content-type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json()
      setnotes(json[0])
    }

      // Add a note...
      const addNote = async (title, description, tag) => {

        //API CALL...
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });

        const note = await response.json()

        setnotes(notes.concat(note));
      }
      
      // Delete a note...
      const deleteNote = async (id) => {

        //API CALL...
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
          const json = await response.json();

          const newNotes = notes.filter((note) => {
                return note._id !== id
          })
          
          // edit a note..
          setnotes(newNotes);
      }
       
      
      // Edit a note...
      const editNote = async (id, title, description, tag) => {

        //API CALL...
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
          const json = await response.json();

        // logic to edit note...
        let NewNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < NewNote.length; index++) {

            if(NewNote[index]._id === id){
              NewNote[index].title = title
              NewNote[index].description = description
              NewNote[index].tag = tag
              break;
            }
          }
          setnotes(NewNote)

      }

    return (
        <NoteContext.Provider value = {{notes, setnotes, addNote, deleteNote, editNote, getNotes, click, setclick}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;