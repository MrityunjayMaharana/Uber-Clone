const mongoose = require('mongoose')

const URI = process.env.MONGO_URI

const dbConnect = () => {
    mongoose.connect(URI)
    .then(() => {
        console.log("Database is connected successfully.")
    }).catch((err) => {
        console.log("Error while connecting Database", err);      
    })
}

module.exports = dbConnect