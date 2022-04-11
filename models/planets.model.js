const fs = require('fs');
const {parse} = require('csv-parse');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'kepler_data.csv');
const planets = require('./planets.mongo');
const habitablePlanets = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanets(){
    return new Promise((resolve, reject) => fs.createReadStream(dataPath)
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async(data) => {
            if (isHabitablePlanet(data)){
                savePlanet(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', async() => {
            const found = (await getAllPlanets()).length;
            console.log(`${found} habitable planets found`);
            resolve();
    }));
}

async function getAllPlanets(){
    return await planets.find({})
}

async function savePlanet(planet){
    
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true
        });
    } catch(err){
        console.log(`Planet saving error: ${err}`);
    }
}

module.exports = {
    loadPlanets,
    getAllPlanets
};