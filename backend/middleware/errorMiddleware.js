const LibraryError  = require("../utils/libraryError");


const mongooseErrorHandler = (err, req, res, next) =>{
    let error = { ...err };

    error.message = err.message

    if(err.name === "CastError"){
        const message = `Invalid ${err.path}:${err.value} this path dose not exit`;
        error = new LibraryError(message, 404);
    }

    if(err.code === 11000){
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
        const message = `Duplicate field value: ${value}. Please enter another value`;;
    }
};