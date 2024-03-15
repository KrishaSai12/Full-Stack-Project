class ErrorHandler extends  Error  { //Error it will generate the error message in 
    constructor(message ,statusCode){
        super(message)
        this.statusCode = statusCode;

        Error.captureStackTrace  (this,this.constructor);// if we give an object it will give a stack property that stack contains where the error has come from and what type of error

    }
}

module.exports = ErrorHandler;