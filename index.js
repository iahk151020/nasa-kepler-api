const http = require('http');
const app = require('./app');
const {loadPlanets} = require('./models/planets.model');
require('dotenv').config();

const server = http.createServer(app);
const port = process.env.PORT || 8000;

async function startServer(){
    await loadPlanets();
    server.listen(port, () => console.log(`Server is listening on port ${port}`));
}

startServer();



