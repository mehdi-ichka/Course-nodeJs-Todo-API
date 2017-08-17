// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connect to mongodb server');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59934460fdfacf46340aa2d0')
    }, {
        $set: { name: 'Mstaph' },
        $inc: { age: 0 }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.close();
})