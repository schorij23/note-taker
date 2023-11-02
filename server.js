// Import and require modules and set up the Express application
const express = require('express');
const html_routes = require('./routes/html-routes')
const api_routes = require('./routes/api-routes')
// Import the 'path' module for working with file and directory paths
const path = require('path');

// Set the servers PORT to default to 3001 if not defined in the environment
const PORT = process.env.PORT || 3001;

// Create an Express app
const app = express();

// Configure the app to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up API routes under the '/api' endpoint
app.use('/api', api_routes);

// Set up HTML routes as the default ('/') endpoint
app.use('/', html_routes);


// Start the Express app and listen on the specified PORT 3001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});