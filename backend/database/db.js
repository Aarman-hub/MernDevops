const mongoose = require('mongoose');

const connectToDB = async () =>{
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
};

module.exports = connectToDB;