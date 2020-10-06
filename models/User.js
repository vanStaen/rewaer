const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    "userID": {
        type: String,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "joinDate": {
        type: String,
        required: true
    },
    "encryptedPWD": {
        type: String,
        required: true
    },
    "avatar": {
        type: String,
        required: false
    },
    "active": {
        type: Boolean,
        required: true
    }
}
)

module.exports = mongoose.model('Users', UserSchema)