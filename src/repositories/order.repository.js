const {Order} = require("../models");

module.exports = {
    // create
    create(data, transaction = null) {
        return Order.create(data, {transaction});
    },

    // read
    findAll(options = {}, transaction = null) {
        return Order.findALl({
            ...options,
            transaction
        });
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