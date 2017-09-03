const Todo = require('./../../models/todo')
const User = require('./../../models/user')
const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const userOneId =  new ObjectID()
const userTwoId =  new ObjectID()

const someTodos = [
    {
        _id: new ObjectID(),
        text: 'SomeThing i should do',
        _creator: userOneId
    },
    {
        _id: new ObjectID(),
        text: 'ontherthing i should do',
        completedAt: 333,
        completed:true,
        _creator: userTwoId
    }
]

const someUsers = [
    {
        _id: userOneId,
        email: 'user@user.com',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    }, {
        _id: new ObjectID(),
        email: 'mehdi@user.com',
        password: 'userTwoPass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    }
]

const populateTodo = (done) => {
    Todo.remove({}).then(() =>{
        return Todo.insertMany(someTodos);
    }).then(() => {
        done();
    });
}

const populateUser = (done) => {
    User.remove({}).then(() =>{
        var userOne = new User(someUsers[0]).save()
        var userTwo = new User(someUsers[1]).save()

        return Promise.all([userOne, userTwo])
   }).then(() => {
        done();
    });
}


module.exports = {someTodos, populateTodo, someUsers, populateUser}