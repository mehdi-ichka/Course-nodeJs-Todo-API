// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connect to mongodb server');

    db.collection('Todos').insertOne({
        text: 'Some text',
        completed: false
    }, (err, result) => {
          if (err) {
              return console.log ('Unable to insert Todo ', err);
          }
          console.log(JSON.stringify(result.ops, undefined, 2));
       })
    db.collection('Users').insertOne({
        name: 'mehdi',
        age: 25,
        location: 'Paris'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
})