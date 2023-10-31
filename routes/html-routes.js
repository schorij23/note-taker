const router = require('express').Router();
const path = require('path');

// Create a GET route for /notes that returns the notes.html file
router.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));


// GET route thats is a catch-all for any request that is not matched by any other route
router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));




module.exports = router;