const {Cart} = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Cart.create(data, {transaction});
    }
    ,
    findOneByUserId(userId, transaction = null) {
        return Cart.findOne({ where: { user_id: userId }, transaction });
    }
}
