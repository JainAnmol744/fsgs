const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Anmoljain:Anmoljain@cluster0.wd0vl2o.mongodb.net/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to Mongo successfully");
    })
}

module.exports = connectToMongo;