const router = require('express').Router();
const dbJSON = require('./db.json')
//Universally Unique Identifier generates unique identifiers
const uuid = require('uuid');
const fs = require('fs'); 

//GET /api/notes should read the db.json file and return all saved notes as JSON
router.get('/api/notes', (req, res) => res.json());

//POST /api/notes should receive a new note to save on the request body,
//add it to the db.json file, and then return the new note to the client.
//give each note a unique id when it's saved uuid

router.post('/api/notes'); //post notes







module.exports = router;