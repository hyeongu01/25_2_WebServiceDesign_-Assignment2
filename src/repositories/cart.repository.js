const {Cart} = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Cart.create(data, {transaction});
    }
}
