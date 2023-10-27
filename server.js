const express = require('express');
const html_routes = require('./html-routes')
const api_routes = require('./api-routes')


const app = express();
const PORT = 3001;

app.use(html_routes);
app.use(api_routes);




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);