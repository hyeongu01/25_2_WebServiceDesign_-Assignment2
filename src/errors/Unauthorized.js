const CustomError = require("./CustomError")

class Unauthorized extends CustomError {
    constructor(message) {
        super(message, 401);
        this.name = "not_found";
    }
}

module.exports = Unauthorized;