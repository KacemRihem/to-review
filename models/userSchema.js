const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.model ("user", UserSchema);