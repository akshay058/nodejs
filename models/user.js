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
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});

// For storage file........

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()) //Appending extension
    }
  });

//static methods
UserSchema.statics.uploadedAvatar = multer({ storage: storage}).single('avatar'); // attaching discStorage to storage
UserSchema.statics.avatarPath = AVATAR_PATH;// publicaly available


const User = mongoose.model('User', UserSchema);
module.exports = User;