const http = require('http');
const app = require('./app');
const { loadLaunches } = require('./models/launches.model');
const {loadPlanets} = require('./models/planets.model');
const {mongoConnect} = require('./services/mongo');
require('dotenv').config();



const server = http.createServer(app);
const port = process.env.PORT || 8000;



async function startServer(){
    await mongoConnect();
    await loadPlanets();
    await loadLaunches();
    server.listen(port, () => console.log(`Server is listening on port ${port}`));
}

startServer();



