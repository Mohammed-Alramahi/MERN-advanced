class HttpException extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = HttpException;