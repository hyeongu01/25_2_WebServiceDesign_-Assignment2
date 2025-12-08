const CustomError = require("./CustomError");

class ConfilictError extends CustomError {
    constructor(message) {
        super(message, 409);
        this.name = "conflict"
    }
}

module.exports = ConfilictError;