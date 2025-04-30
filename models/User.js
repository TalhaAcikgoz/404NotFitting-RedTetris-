const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    score: Int16Array
});

const User = mongoose.model('User', userSchema);

module.exports = User;