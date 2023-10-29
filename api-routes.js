const express = require('express');
const router = express.Router();
//Universally Unique Identifier generates unique identifiers
const { v4: uuidv4 } = require('uuid');
const fs = require('fs'); 

//GET /api/notes should read the db.json file and return all saved notes as JSON
router.get('/api/notes', (req, res) => {
    fs.readFile('./db.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.json('Note not found');
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

//POST /api/notes should receive a new note to save on the request body,
//add it to the db.json file, and then return the new note to the client.

router.post('/api/notes', (req, res) => {
    // Read db.json existing notes, handle errors
    fs.readFile('./db.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.json('Note not found');
        }
        // Parse the JSON data into a JavaScript object that represents a note
        const notes = JSON.parse(data);
        // Unique id for the note
        const newNoteId = uuidv4();
        // New note with request body an ID
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: newNoteId
        };
        // Adds a new note to the note array
        notes.push(newNote);

        // Write the new note to the database
        fs.writeFile('./db.json', JSON.stringify(notes), err => {
            if (err) {
                console.error(err);
                return res.json('Note not saved');
            }
            // Returns the new note
            res.json(newNote);
        })
    });
});



module.exports = router;