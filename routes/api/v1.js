const express = require('express');

const LaunchesRouter = require('../launches/launches.routes');
const PlanetsRouter = require('../planets/planets.routes');

const router = express.Router();

router.use('/launches', LaunchesRouter);
router.use('/planets', PlanetsRouter);

module.exports = router;