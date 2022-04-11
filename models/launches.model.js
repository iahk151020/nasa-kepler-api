const launches = new Map();
const launchesDB =  require('./launches.mongo');
const planets = require('./planets.mongo');
let lastFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kpler',
    rocket: 'ExO11',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers:['Khai' ,'Hoan'],
    upcoming: true,
    success: true
};

saveLaunch(launch);

launches.set(launch.flightNumber, launch);

function launchIdExist(id){
    return launches.has(id);
}

async function getAllLaunches(){
    return await launchesDB.find({}, {"_id": 0, "__v":0});
}

function addNewLaunch(launch){
    lastFlightNumber++;
    launches.set(lastFlightNumber, Object.assign(launch, {
        flightNumber: lastFlightNumber,
        launchDate: new Date(launch.launchDate),
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA']
    }));
}

async function saveLaunch(launch){

    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if (!planet){
        throw new Error('Planet not found');
    }

    await launchesDB.updateOne({
        flightNumber: launch.flightNumber
    },
    launch,{
        upsert: true
    });
}

function deleteLaunchById(id){
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;    
    return aborted;
}

module.exports = {
    launchIdExist,
    getAllLaunches,
    addNewLaunch,
    deleteLaunchById
}
 