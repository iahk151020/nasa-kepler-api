const http = require('http');
const app = require('./app');
const {loadPlanets} = require('./models/planets.model');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = 'mongodb://localhost:27017/NASA';

const server = http.createServer(app);
const port = process.env.PORT || 8000;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanets();
    server.listen(port, () => console.log(`Server is listening on port ${port}`));
}

startServer();



