const launches = new Map();
const { default: axios } = require('axios');
const launchesDB =  require('./launches.mongo');
const planets = require('./planets.mongo');

const SPACEX_API_LAUNCHES = "https://api.spacexdata.com/v4/launches/query";

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

async function populateDB(){
    
}

async function launchIdExist(id){
    const flightExist = await launchesDB.findOne({flightNumber: id});
    return !flightExist ? false : true;
}

async function getAllLaunches(limit, skip){
    return await launchesDB
    .find({}, {"_id": 0, "__v":0})
    .sort({flightNumber:  1})
    .skip(skip)
    .limit(limit);
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

async function findLaunch(filter){
    return await launchesDB.findOne(filter);
}

async function loadLaunches(){
    console.log("Downloading launches data....");
    const res = await axios.post(SPACEX_API_LAUNCHES, {
            pagination: false,
            query:{},
            options:{
                populate: [
                    {
                        path: "rocket",
                        select: {
                            name: 1
                        }
                    },
                    {
                        path: "payloads",
                        select: {
                            customers: 1
                        }
                    }
                ]
            }
    })
    
    const data = await res.data.docs;
    

    for (const launchDoc of data){ 
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['data_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: launchDoc['payloads'].map(payload => payload.customers)
        }

        console.log(`${launch.flightNumber} - ${launch.rocket}`);
    }
}

module.exports = {
    launchIdExist,
    getAllLaunches,
    deleteLaunchById,
    scheduleNewLaunch,
    loadLaunches
}
 