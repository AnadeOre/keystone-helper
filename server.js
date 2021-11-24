const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./Routes/api');
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3000'
}))

// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, '../client/build')));


// HTTP request logger
app.use(morgan('tiny'));

app.use('/api', routes)

/*app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});*/

app.listen(PORT, console.log(`Server starting at ${PORT}`))