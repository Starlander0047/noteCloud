require("dotenv").config();
const mongoose = require('mongoose');

const connectToMongo = async () =>
{
    await mongoose.connect("mongodb+srv://asadalei0047:noteCloudClusterPassword@notecloudcluster.6fpfhzp.mongodb.net/notecloudDB?retryWrites=true&w=majority");
    console.log("Connected to Mongo Successfully!");
}

module.exports = connectToMongo;