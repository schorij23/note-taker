// Import and require modules for setting up HTML routes
const router = require('express').Router();
// Import the 'path' module for working with file and directory paths
const path = require('path');


// GET request for the /notes route
router.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));


// GET route thats is a catch-all for any request that is not matched by any other route
router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));




module.exports = router;