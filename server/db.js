const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/inotebook?"    //url for the mongodb database

// arrow function for the connection setup to the mongodb using mongoose
const connectToNongo = () => {
    mongoose.connect(mongoURL);
}

module.exports = connectToNongo;