const CustomError = require("./CustomError")

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
        this.name = "not_found";
    }
}

module.exports = NotFoundError;