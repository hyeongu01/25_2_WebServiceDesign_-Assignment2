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

    delete(data, transaction = null) {
        return Wishlist_Item.update({
            deleted_at: new Date()
        }, {where: data, transaction})
    },

    restore(data, transaction = null) {
        return Wishlist_Item.update({
            deleted_at: null
        }, {where: data, transaction})
    }
}