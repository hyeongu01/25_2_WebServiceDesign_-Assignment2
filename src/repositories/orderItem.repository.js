const {Order_Item} = require("../models");

module.exports = {
    // create
    create(data, transaction = null) {
        return Order_Item.create(data, {transaction});
    },

    // read
    findAll(options = {}, transaction = null) {
        return Order_Item.findAll({
            ...options,
            transaction
        })
    },

    findOneById(id, transaction = null) {
        return Order_Item.findByPk(id, {transaction});
    },

    // update
    update(id, newData, transaction = null) {
        return Order_Item.update(newData, {
            where: {id},
            transaction
        });
    },

    // delete
    delete(id, transaction = null) {
        return Order_Item.destroy({
            where: {id},
            transaction
        })
    }
}
