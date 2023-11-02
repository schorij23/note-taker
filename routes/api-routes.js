// Import and require modules for setting up API routes
const router = require('express').Router();
//Universally Unique Identifier generates unique identifiers
const { v4: uuidv4 } = require('uuid');
const fs = require('fs'); 

// GET request to retrieve notes from the JSON database to notes.html path
router.get('/notes', (req, res) => {
    // Read the notes from the JSON database using utf8 encoding
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // If there is an error return status 500 server side error response
        if (err) {
            return res.status(500).json("reading notes failed");
        }
        // Parse the JSON string data into an array of notes
        let notes = JSON.parse(data);
        // Respond with the array of notes as JSON
        return res.json(notes);
    });
});
// POST request to add a new note to the JSON database to notes.html path
router.post('/notes', (req, res) => {
    // Read the existing notes from the JSON database
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // If there is an error return status 500 server side error response
        if (err) {
            console.error(err);
            return res.status(500).json('reading notes failed');
        }
            // Parse the JSON string data from the file into a array of notes
            const notes = JSON.parse(data);
        // Generate a new unique ID for the new note using uuidv4
        const newNoteId = uuidv4();
        // Create a new note object using the data from the request body and the new ID
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: newNoteId
        }; 
        // Adds the new note to the notes array
        notes.push(newNote);
        // Write the updated note array back to a string in the database
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            // If there is an error return status 500 server side error response
            if (err) {
                console.error(err);
                return res.status(500).json('writing notes failed');
            }
            // If no errors returns the new note as a response
            return res.json(newNote);
        });
    });
});
    //DELETE request to delete a note by id from the JSON database
    router.delete('/notes/:id', (req, res) => {
    // Read the existing notes from the JSON database
    fs.readFile('./db/db.json', 'utf8', (Err, data) => {
        // If there is an error return status 500 server side error response
        if (Err) {
            console.error(Err);
            return res.status(500).json('reading notes failed');
        }
        // Declare the notes object
        let notes;
        //Parse JSON data from the file into the notes array
        notes = JSON.parse(data);
        // Use the ID to find the index of the note in the notes array
        const noteIndex = notes.findIndex((note) => note.id === req.params.id);
        // Check if the note doesn't exist. findIndex returns -1 when no match
        if (noteIndex === -1) {
            // If there is no note return status 400 client side error response
            return res.status(404).json('Note not found');
        }
        // Remove one note from the array based on index, only deletes when note index exists
        notes.splice(noteIndex, 1);
        // Write the updated notes back to a string in the JSON Database
        fs.writeFile('./db/db.json', JSON.stringify(notes), (Err) => {
            // If there is an error return status 500 server side error response
            if (Err) {
                console.error(Err);
                return res.status(500).json('writing notes failed');
            }
            // If the note is writen return a success message
            return res.json('Note deleted successfully');
        });
    });
});

module.exports = router;