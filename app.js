const express = require('express');
const app = express();
const cors = require('cors');
const api_v1 = require('./routes/api/v1');
const path = require('path');
const morgan = require('morgan');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'))

app.use(express.json());  
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1', api_v1);// similar to next api version
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

module.exports = app;