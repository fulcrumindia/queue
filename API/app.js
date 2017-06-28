const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

const api = require('./routes/api');
const config = require('./config/database');

// connect to mongoose db
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected',() => {
    console.log('Connected to database '+config.database);
});

// on error
mongoose.connection.on('error',(err) => {
    console.log('Database Error '+err);
});

// cors middleware
app.use(cors());

// body parse middleware
app.use(bodyParser.json());

app.use('/api',api);

// set static folder
app.use(express.static(path.join(__dirname, '../admin')));

// index route
app.get('/',(req,res)=>{
    res.send('Hello World');
});

// start server
app.listen(port, () => {
    console.log('Server running on port :'+port);
});