const Notes = require('../models/Notes')
const express = require('express') 
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const {body, validationResult} = require('express-validator')

//  Route1 : Add a new Notes using : POST "/api/auth/addnote". login required..
router.post('/addnotes', fetchuser, [
    body('title','Enter a valid title').isLength({min:3}),
    body('description', 'description should contain atleast 10 characters').isLength({min:10})
], async (req,res) => {

    try {
        const {title, description, tag} = req.body;
        // if there are errors, return bad requests and the errors..
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()

        res.json(savedNotes)
    } catch (error) {
        res.status(400).send("Internal Server Error ")
    }
})

//  Route2 : Get all the notes using : GET "/api/notes/fetchallnotes". login required..
router.get('/fetchallnotes', fetchuser, async (req,res) => {
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json([notes])
    } catch (error) {
        res.status(400).send("Internal Server Error ")
    }
})

//  Route3 : Update the existing notes using : PUT "/api/notes/updatenote". login required..
router.put('/updatenote/:id', fetchuser, async (req,res) => {

    try {
        const {title, description, tag} = req.body;
        
        //   create a newNote object
        const newNote = {}
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }

        //  find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})

    } catch (error) {
        res.status(400).send("Internal Server Error ")
    }
})

//  Route4 : delete the existing notes using : DELETE "/api/notes/deletenote". login required..
router.delete('/deletenote/:id', fetchuser, async (req,res) => {

    try {
        const {title, description, tag} = req.body;

        //  find the note to be delete and delete it
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }
        
        //  alow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success" : "note has been deleted", note: note})

    } catch (error) {
        res.status(400).send("Internal Server Error ")
    }
})



module.exports = router