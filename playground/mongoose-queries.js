
const {mongoose} = require('./../server/db/mongoose')
const Todo = require('./../server/models/todo')
const User = require('./../server/models/user')

var id = '5999f604bdd3a20c0f469688';

Todo.findById(id).then((Todo) => {
    if (!Todo) {
        return console.log('the id is not found')
    }
    console.log('Todo', Todo)
}).catch((e) => console.log(e));