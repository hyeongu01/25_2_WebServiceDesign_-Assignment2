class CustomError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);    
    }

    response() {
        return {
            error: this.name,
            message: this.message
        }
    }
}

module.exports = CustomError;