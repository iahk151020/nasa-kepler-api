const launchesModel = require('../../models/launches.model');

async function getAllLaunches(req, res){
    return res.status(200).json(await launchesModel.getAllLaunches());
}

async function addNewLaunch(req, res){
    const newLaunch = req.body;
    if (!newLaunch.mission || !newLaunch.launchDate || !newLaunch.rocket || !newLaunch.target){
        return res.status(400).json({
            message: "Missing required launch property"
        })
    }

    if (isNaN(new Date(newLaunch.launchDate))){
        return res.status(400).json({
            message: "Invalid launch date"
        })
    }

    await launchesModel.scheduleNewLaunch(newLaunch);
    return res.status(201).json(newLaunch);
}

async function abortLaunch(req, res){
    const id = req.params.id;
    const launchExist = await launchesModel.launchIdExist(id);

    if (!launchExist){
        return res.status(404).json({
            message: "Launch not found"
        });
    }

    const aborted = await launchesModel.deleteLaunchById(id);

    return res.status(200).json(aborted);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch
}