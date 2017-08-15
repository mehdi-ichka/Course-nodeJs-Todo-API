// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connect to mongodb server');

    // db.collection('Users').find({name: 'mehdi'}).toArray().then((docs) => {
    //     console.log('Users');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data from Users', err);
    // })

    db.collection('Users').findOneAndDelete({name: 'jen'}).then((result) => {
        console.log(result);
    })

    // db.collection('Todos').count()
    // .then((count) => {
    //     console.log('Todos count: ', count);
    // }, (err) => {
    //     console.log('Unable to fetch data from Todos', err);
    // })

    db.close();
})