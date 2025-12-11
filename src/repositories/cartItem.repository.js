const {Cart_Item} = require("../models");

module.exports = {
    // create
    create(data, transaction = null) {
        return Cart_Item.create(data, {transaction});
    },

    // read
    findAll(options = {}, transaction = null) {
        return Cart_Item.findAll({
            ...options,
            transaction
        })
    },

    findById(cartId, bookId, transaction) {
        return Cart_Item.findByPk()
    },

    // update
    update(cartId, bookId, newData, transaction = null) {
        return Cart_Item.update(newData, {
            where: {
                cart_id: cartId,
                book_id: bookId
            },
            transaction
        })
    },

    // delete
    delete(cartId, bookId, transaction = null) {
        return Cart_Item.destroy({
            where: {
                cart_id: cartId,
                book_id: bookId
            },
            transaction
        })
    }
}