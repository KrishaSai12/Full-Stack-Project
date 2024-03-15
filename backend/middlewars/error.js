const ErrorHandler = require("../utills/errorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).json({
            success : false,
            message : err.message,
            stack : err.stack,
            error: err // will give brief description of error
        })

    }

    
    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message); // which gets all the  values of err

        if(err.name =='ValidationError'){
            message = Object.values(err.errors).map(value => value.message);
            error =  new Error(message ,400);
            
        }
        // the cast error occurs if the id is wrong or any other value it will show  not a correct a type

        if(err.name == 'CastError'){
            message =`Resource not found :  ${err.path} `;
            error =  new Error(message ,400);

        }
        // this error occurs when the same mail id is given another time because we kept email is unique in user scheme
        if(err.code ==1100){
            let message = `Duplicate Key ${Object.keys(err.keyValue)} error`
            error =  new Error(message ,400);

        }
        if(err.name == 'JSONWebTokenError'){
            let message = `JSONWebToken Is Invalid Try Again `;
            error =  new Error(message ,400);
            
        }
        if(err.name == 'TokenExpiredError'){
            let message = `JSON Web Token is invalid Try Again`;
            error = new Error(message,400);
        }
        res.status(err.statusCode).json({
            success : false,
            message : error.message || 'Internal Server Error'
            
        })


    }
    
}