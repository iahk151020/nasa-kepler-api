const launchesModel = require('../../models/launches.model');

function getAllLaunches(req, res){
    return res.status(200).json(launchesModel.getAllLaunches());
}

function addNewLaunch(req, res){
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

    launchesModel.addNewLaunch(newLaunch);
    return res.status(201).json(newLaunch);
}

function abortLaunch(req, res){
    const id = req.params.id;
    if (!launchesModel.launchIdExist(id)){
        return res.status(404).json({
            message: "Launch not found"
        });
    }

    const aborted = launchesModel.deleteLaunchById(id);

    return res.status(200).json(aborted);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch
}