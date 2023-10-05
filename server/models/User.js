const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
        default: ""

    },
    age: {
        type: String,
        default: "20"
    },
    location: {
        type: String,
        default: "Bhopal"
    },
    bio: {
        type: String,
        default: "this is about me"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('user', UserSchema);
// User.createIndexes();
module.exports = User;