const launches = new Map();
let lastFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kpler',
    rocket: 'ExO11',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer:['Khai' ,'Hoan'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function launchIdExist(id){
    return launches.has(id);
}

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    lastFlightNumber++;
    launches.set(lastFlightNumber, Object.assign(launch, {
        flightNumber: lastFlightNumber,
        launchDate: new Date(launch.launchDate),
        success: true,
        upcoming: true,
        customer: ['ZTM', 'NASA']
    }));
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
 