const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = Mongoose.model('Users', userSchema);