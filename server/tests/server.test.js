const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb')
const app = require('./../server');
const Todo = require('./../models/todo');
const User = require('./../models/user');
const {someTodos, populateTodo,someUsers, populateUser} = require('./seed/seed')

beforeEach(populateTodo);
beforeEach(populateUser);

// describe('POST /todos', () => {
//     it('should create a new todo', (done) => {
//         var text = 'test todo text';

//         request(app)
//         .post('/todos')
//         .send({text})
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.text).toBe(text);
//         })
//         .end((err, res) => {
//             if (err) { return done(err); }

//             Todo.find({text}).then((todos) => {
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done();
//             }).catch((e) => done(e));
//         })
//     });

//     it('should not creat a todo with invalid data', (done) => {
//         request(app)
//         .post('/todos')
//         .send({})
//         .expect(400)
//         .end((err, res) => {
//             if (err) { 
//                 return done(err);
//             }

//             Todo.find().then((todos) => {
//                 expect(todos.length).toBe(2);
//                 done();
//             }).catch((e) => done(e));
//         })
//     })
// });

// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//           .get('/todos')
//           .expect(200)
//           .expect((res) => {
//               expect(res.body.todos.length).toBe(2)
//           })
//           .end(done)
//     })
// });

// describe('GET /todos/:id', () => {
//     it('should get the todo by id', (done) => {
//         request(app)
//           .get(`/todos/${someTodos[0]._id.toHexString()}`)
//           .expect(200)
//           .expect((res) => {
//               expect(res.body.text).toBe(someTodos[0].text)
//           })
//           .end(done);
//     })
//     it('should return 404 if todo not found', (done) => {
//         request(app)
//           .get(`/todos/123abc`)
//           .expect(404)
//           .end(done)
//     })
//     it('should return 404 for no todo object ids', (done) => {
//         var hexId = ObjectID().toHexString();
//         request(app)
//           .get(`/todos/${hexId}`)
//           .expect(404)
//           .end(done)
//     })
// })

// describe('DELETE /todos/:id', () => {
//     it('should return and delete todo by id', (done) => {
//         var id = someTodos[0]._id.toHexString();
//         request(app)
//           .delete(`/todos/${id}`)
//           .expect(200)
//           .expect((res) => {
//               expect(res.body.todo.text).toBe(someTodos[0].text)
//           })
//           .end((err, res) => {
//               if(err) {
//                   return done(err)
//               }

//               Todo.findById(id).then((todo) => {
//                   expect(todo).toBe({})
//                   done()
//               }).catch((e) => {
//                   done(err)
//               })
//           })
//     })

//     it('should return 404 for no todo object ids', (done) => {
//         var hexId = ObjectID().toHexString()
//         request(app)
//           .delete(`/todos/${hexId}`)
//           .expect(404)
//           .end(done)
//     })
// })

// describe('PATCH /todos/:id', () => {
//     it('should return and patch todo by id', (done) => {
//         var id = someTodos[0]._id.toHexString();
//         var text = 'new text for test';

//         request(app)
//           .patch(`/todos/${id}`)
//           .send({
//             text: text,
//             completed: true
//           })
//           .expect(200)
//           .expect((res) => {
//               expect(res.body.todo.text).toBe(text)
//               expect(res.body.todo.completed).toBe(true)
//               expect(res.body.todo.completedAt).toBeA('number')
//           })
//           .end((err, res) => {
//               if(err) {
//                   return done(err)
//               }

//               Todo.findById(id).then((todo) => {
//                 expect(res.body.todo.text).toBe(text)
//                 expect(res.body.todo.completed).toBe(true)
//                 expect(res.body.todo.completedAt).toBeA('number')
//                 done()
//               }).catch((e) => {
//                 done(err)
//               })
//           })
//     })

//     it('should return 404 for no todo object ids', (done) => {
//         var hexId = ObjectID().toHexString()
//         request(app)
//           .patch(`/todos/${hexId}`)
//           .expect(404)
//           .end(done)
//     })
// })

// describe('GET /users/me', () => {
//     it('should return user if authenticated', (done) => {
//         request(app)
//           .get('/users/me')
//           .set('x-auth', someUsers[0].tokens[0].token)
//           .expect(200)
//           .expect((res) => {
//               expect(res.body._id).toBe(someUsers[0]._id.toHexString())
//               expect(res.body.email).toBe(someUsers[0].email)
//           })
//           .end(done)
//     })
    
//     it('should return 401 if not authenticated', (done) => {
//         request(app)
//           .get('/users/me')
//           .expect(401)
//           .expect((res) => {
//               expect(res.body).toEqual({})
//           })
//           .end(done)
//     })
// })

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com'
        var password = 'randomPassword'

        request(app)
          .post('/users')
          .send({email, password})
          .expect(200)
          .expect((res) => {
              expect(res.headers['x-auth']).toExist()
              expect(res.body.email).toBe(email)
          })
          .end((err) => {
            if (err) { return done(err) }

            User.findOne({email}).then((user) => {
                expect(user).toExist()
                expect(user.password).toNotBe(password)
                done()
            })
          })
    })

    it('should return validation errors if request invalid', (done) => {
        var email = 'example.com'
        var password = 'randomPassword'

        request(app)
          .post('/users')
          .send({email, password})
          .expect(400)
          .end(done)
    })

    it('should not create user if email in use', (done) => {
        var email = someUsers[0].email
        var password = 'randomPassword'

        request(app)
          .post('/users')
          .send({email, password})
          .expect(400)
          .end(done)
    })
})

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        var email = someUsers[1].email
        var password = someUsers[1].password

        request(app)
          .post('/users/login')
          .send({email, password})
          .expect(200)
          .expect((res) => {
              expect(res.headers['x-auth']).toExist()
          })
          .end((err, res) => {
              if (err) {return done(err)}
              User.findById(someUsers[1]._id).then((user) => {
                expect(user.tokens[0]).toInclude({
                    access: 'auth',
                    token: res.headers['x-auth']
                })
                done()
              }).catch((e) => done(e))
          })
    })

    it('should reject invalid login', (done) => {
        var email = someUsers[1].email
        var password = someUsers[1].password + '1' 

        request(app)
          .post('/users/login')
          .send({email, password})
          .expect(400)
          .expect((res) => {
              expect(res.headers['x-auth']).toNotExist()
          })
          .end((err, res) => {
              if (err) {return done(err)}
              User.findById(someUsers[1]._id).then((user) => {
                expect(user.tokens.length).toBe(0)
                done()
              }).catch((e) => done(e))
          })
    })

})