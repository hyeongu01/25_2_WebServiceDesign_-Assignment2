const {Order} = require("../models");

module.exports = {
    // create
    create(data, transaction = null) {
        return Order.create(data, {transaction});
    },

    // read
    findAll(options = {}, transaction = null) {
        return Order.findAll({
            ...options,
            transaction
        });
    },

    findAllByUserId(userId, options = {}, transaction = null) {
        return Order.findAll({ where: { user_id: userId }, ...options, transaction });
    },

    findOneById(id, transaction = null) {
        return Order.findByPk(id, {transaction});
    },

    // update (status)
    update(id, newData, transaction = null) {
        return Order.update(newData, {where: {id}, transaction});
    },

    // delete
    delete(id, transaction = null) {
        return Order.destroy({
            where: {id},
            transaction
        })
    },

    restore(id, transaction = null) {
        return Order.restore({
            where: {id},
            transaction
        })
    }
}