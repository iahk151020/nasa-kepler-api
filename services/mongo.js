const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/NASA';
console.log(MONGO_URL);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect(() => {
        console.log('Disconnected from MongoDB');
    })
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}