require("dotenv").config();
const express = require("express");
const connectToDB = require('./database/db');

const bookRoutes = require("./routes/bookRoutes");


process.on('uncaughtException',error=>{
    console.log("Uncaught Exception....");
    console.log(error.name, error.message);
    server.close(()=>{
        process.exit();
    });
});

const app = express();


connectToDB();

app.use(express.json());


app.use("/api/v1/", bookRoutes);
app.get('/',(req, res)=>{
    res.send("Welcome");
});

app.get('/test',(req, res)=>{
    res.json({Hi:"Hello test."});
});



const PORT=process.env.PORT || 8000;

const server = app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_DEV} mode on port ${PORT}`);
});

process.on("unhandledRejection",(error)=>{
    console.log("Unhandled Rejection....");
    console.log(error.name, error.message);
    server.close(()=>{
        process.exit(1);
    });
});