const launches = new Map();
const launchesDB =  require('./launches.mongo');
const planets = require('./planets.mongo');

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

async function launchIdExist(id){
    const flightExist = await launchesDB.findOne({flightNumber: id});
    return !flightExist ? false : true;
}

async function getAllLaunches(){
    return await launchesDB.find({}, {"_id": 0, "__v":0});
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDB.findOne().sort({flightNumber : -1});

    return !latestLaunch ? 100 : latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch){
    
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: newFlightNumber
    })

    await saveLaunch(newLaunch);
}

async function saveLaunch(launch){

    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if (!planet){
        throw new Error('Planet not found');
    }

    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber
    },
    launch,
    {
        upsert: true
    });
}

async function deleteLaunchById(id){
    try {
        const aborted = await launchesDB.findOneAndUpdate({
            flightNumber: id
        }, {
            success: false,
            upcoming: false
        })   
    } catch (error) {
        throw new Error('Launch not found');
    }
    return aborted;
}

module.exports = {
    launchIdExist,
    getAllLaunches,
    deleteLaunchById,
    scheduleNewLaunch
}
 