const mongoose = require('mongoose');
const multer = require('multer'); // for file uploads
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars'); // path given for saving files 

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;