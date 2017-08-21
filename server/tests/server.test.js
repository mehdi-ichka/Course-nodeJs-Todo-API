const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb')
const app = require('./../server');
const Todo = require('./../models/todo');

const someTodos = [
    {
        _id: new ObjectID(),
        text: 'SomeThing i should do'
    },
    {
        _id: new ObjectID(),
        text: 'ontherthing i should do'
    }
]

beforeEach((done) => {
    Todo.remove({}).then(() =>{
        return Todo.insertMany(someTodos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) { return done(err); }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        })
    });

    it('should not creat a todo with invalid data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) { 
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    })
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
          .get('/todos')
          .expect(200)
          .expect((res) => {
              expect(res.body.todos.length).toBe(2)
          })
          .end(done)
    })
});

describe('GET /todos/:id', () => {
    it('should get the todo by id', (done) => {
        request(app)
          .get(`/todos/${someTodos[0]._id.toHexString()}`)
          .expect(200)
          .expect((res) => {
              expect(res.body.text).toBe(someTodos[0].text)
          })
          .end(done);
    })
    it('should return 404 if todo not found', (done) => {
        request(app)
          .get(`/todos/123abc`)
          .expect(404)
          .end(done)
    })
    it('should return 404 for no todo object ids', (done) => {
        var hexId = ObjectID().toHexString();
        request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done)
    })
})