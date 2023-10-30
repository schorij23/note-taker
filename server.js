const express = require('express');
const html_routes = require('./routes/html-routes')
const api_routes = require('./routes/api-routes')


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(html_routes);
app.use(api_routes);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});