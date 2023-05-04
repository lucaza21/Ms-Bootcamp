const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
})


/* const User = mongoose.model('bootcamp', userSchema, 'users')
module.exports = User; */

const dbs={};

dbs.Users = mongoose.model('bootcamp', userSchema, 'users');

module.exports = dbs;
