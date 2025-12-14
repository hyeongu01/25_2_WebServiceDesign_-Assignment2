const {Wishlist} = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Wishlist.create(data, {transaction});
    },

    findOneByUserId(userId, transaction = null) {
        return Wishlist.findOne({
            where: {
                user_id: userId
            }, transaction
        })
    }
}