const express = require('express');
const html_routes = require('./html-routes')
const api_routes = require('./api-routes')

const app = express();



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);