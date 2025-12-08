const CustomError = require("./CustomError")

class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
        this.name = "bad_request";
    }
}

module.exports = BadRequestError;