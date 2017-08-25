const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

var data = {
    id: 10
}

var token = jwt.sign(data, '123abc')
console.log(token)

var decode = jwt.verify(token, '123abc')
console.log(decode)

// var message = 'I am user 3'
// var hash = SHA256(message).toString()

// var data= {
//     id: 4
// }
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'SomeSecret').toString()
// }

// token.data.id = 5;
// token.hash =  SHA256(JSON.stringify(data)).toString()

// var resultHash = SHA256(JSON.stringify(data) + 'SomeSecret').toString()
// if (resultHash === token.hash) {
//     console.log('Data was not changed')
// } else {
//     console.log('Data was changed.Do not trust')
// }