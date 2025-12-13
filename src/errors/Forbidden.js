const CustomError = require("./CustomError");

class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403);
        this.name = "forbidden";
    }
}

module.exports = ForbiddenError;
