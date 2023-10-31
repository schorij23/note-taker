const router = require('express').Router();
//Universally Unique Identifier generates unique identifiers
const { v4: uuidv4 } = require('uuid');
const fs = require('fs'); 

//GET /api/notes should read the db.json file and return all saved notes as JSON
router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json("reading notes failed");
        }
        return res.json(data);
    });
});

//POST /api/notes should receive a new note to save on the request body,
//add it to the db.json file, and then return the new note to the client.

router.post('/api/notes', (req, res) => {
    // Read db.json existing notes, handle errors
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json('reading notes failed');
        }

            // Parse the JSON data into a JavaScript object that represents a note
            const notes = JSON.parse(data);
        // const newNoteId = uuidv4();
        const newNoteId = uuidv4();
        // New note with request body an ID
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: newNoteId
        };
        
        // Adds a new note to the note arrayclear

        notes.push(newNote);

        // Write the new note to the database
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            if (err) {
                console.error(err);
                return res.status(500).json('writing notes failed');
            }
            // Returns the new note
            res.json(newNote);
        })
    });
});



module.exports = router;