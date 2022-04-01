const router = require('express').Router();
const { getAllLaunches, addNewLaunch, abortLaunch } = require('./launches.controller');

router.get('/launches', getAllLaunches);
router.post('/launches', addNewLaunch);
router.delete('/launches/:id', abortLaunch);
module.exports = router;