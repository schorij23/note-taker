const router = require('express').Router();
//Universally Unique Identifier generates unique identifiers
const { v4: uuidv4 } = require('uuid');
const fs = require('fs'); 
//The following API routes should be created:
//POST /api/notes should receive a new note to save on the request body, 
//add it to the db.json file, and then return the new note to the client. 
//You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you)

//GET /api/notes should read the db.json file and return all saved notes as JSON
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json("reading notes failed");
        }
        // console.log(data);
        var notes = JSON.parse(data);
        return res.json(notes);
    });
});

//POST /api/notes should receive a new note to save on the request body,
//add it to the db.json file, and then return the new note to the client.

router.post('/notes', (req, res) => {
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
        
        // Adds a new note to the note array
        notes.push(newNote);

        // Write the new note to the database
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            if (err) {
                console.error(err);
                return res.status(500).json('writing notes failed');
            }
            // Returns the new note
            return res.json(newNote);
        })
    });
});


        // router.delete("./notes:id", (req, res) => {
        //     fs.readFile('./db/db.json', 'utf8', (err, data) => {
        //         if (err) {
        //             console.error(err);
        //             return res.status(500).json('reading notes failed');
        //         }

        //         let notes;

        //     })
        // })
module.exports = router;