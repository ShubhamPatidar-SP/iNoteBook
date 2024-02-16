const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser.js');
const Note = require('../models/Note.js');
const { body, validationResult } = require('express-validator');


//ROUTER 1 ==================================================================================
// Fetching the data of user's notes using GET "/fetchallnotes" (login required)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error is occured");
    }
});

//ROUTER 2 =====================================================================================
// ADDING the data of user's notes using POST "/addnotes" (login required)
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title ').isLength({ min: 3 }),
    body('description', 'Enter a valid description at list 5 charecter ').isLength({ min: 6 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);                                   //storing validation result in the errors
        if (!errors.isEmpty()) {                                                // if error is not empty means there is some error in it
            return res.status(404).json({ errors: "internal serve error" });
        }
        // creating new note
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const saveNode = await note.save();
        res.json(saveNode);
    } catch {
        console.error(error.message);
        res.status(500).send("Some internal server error is occured");
    }
});

//ROUTER 3 =====================================================================================
// UPDATING the data of user's notes using POST "/updatenote" (login required)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        // destructuring of the array
        const { title, description, tag } = req.body;
        //creating new note
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated by user id and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found ") };

        // allow deletion if user is own thid nnote 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("illegal operation");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error is occured");
    }

});


//ROUTER 3 =====================================================================================
// DELETING  the data of user's notes using DELETE "/deletenote" (login required)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // destructuring of the array
    try {
        // find the note to be deleted by user id and delete it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found ") };

        // allow deletion if user is own thid nnote 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("illegal operation");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": " note is deleted successfully ", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error is occured");
    }

});


module.exports = router;
