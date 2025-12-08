const {Wishlist} = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Wishlist.create(data, {transaction});
    }
}