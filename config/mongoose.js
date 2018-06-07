const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
    // connect to mongodb
    mongoose.connect(config.mongodb);
    mongoose.Promise = global.Promise;

    // instantiate obj
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error：'));
    db.once('open', (callback) => {
        console.log('connected');
    });
    return db;
};