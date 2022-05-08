const router = require('express').Router();
const { getAllLaunches, addNewLaunch, abortLaunch } = require('./launches.controller');

router.get('/', getAllLaunches);
router.post('/', addNewLaunch);
router.delete('/:id', abortLaunch);
module.exports = router;