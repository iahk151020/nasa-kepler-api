const fs = require('fs');
const {parse} = require('csv-parse');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'kepler_data.csv');
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
        .on('data', (data) => {
            if (isHabitablePlanet(data)){
                habitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            console.log("DONE!!!");
            resolve();
    }));
}


module.exports = {
    loadPlanets,
    planets: habitablePlanets
};