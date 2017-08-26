var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOLAB_ONYX_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };

// cd "C:\Program Files\MongoDB\Server\3.4\bin"
// ./mongod --dbpath "C:\Users\Mehdi Ichkarrane\mongo-data"
