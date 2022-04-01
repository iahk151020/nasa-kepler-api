const express = require('express');
const app = express();
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.routes');
const launchesRouter = require('./routes/launches/launches.routes');
const path = require('path');
const morgan = require('morgan');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'))

app.use(express.json());  
app.use(express.static(path.join(__dirname, 'public')));
app.use(planetsRouter);
app.use(launchesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

module.exports = app;