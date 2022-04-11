const mongoose = require('mongoose');

const PlanetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true
    }
})

//connects planetSchema to a collection named Planet in mongodb
module.exports = mongoose.model('Planet', PlanetSchema);