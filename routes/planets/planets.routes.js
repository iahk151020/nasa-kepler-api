const express = require('express');
const router = express.Router();
const {httpGetAllPlanets} = require('./planets.controller');

router.get('/planets', httpGetAllPlanets);

module.exports = router;