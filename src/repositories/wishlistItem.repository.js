const {Wishlist_Item} = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Wishlist_Item.create(data, {transaction});
    },

    findAll(options = {}, transaction = null) {
        return Wishlist_Item.findAll({
            where: {deleted_at: null},
            ...options, 
            transaction
        });
    },

    findOne(data, transaction = null) {
        return Wishlist_Item.findOne({
            where: data,
            transaction
        })
    },

    delete(data, transaction = null) {
        return Wishlist_Item.destroy({
            where: data,
            transaction
        })
    },

    restore(data, transaction = null) {
        return Wishlist_Item.restore({
            where: data,
            transaction
        })
    }
}