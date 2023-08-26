
// class errorhandler is inheriting the Error class ( node's internal class )
class ErrorHandler extends Error {
    
    constructor(statusCode,message){
        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler; // since it is a class we won't use {} here 
// cannnot use the class directly , we need to create a middleware to use this class