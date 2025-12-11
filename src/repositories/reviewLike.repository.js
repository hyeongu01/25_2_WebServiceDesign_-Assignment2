const {Review_Like} = require("../models");

module.exports = {
    // create
    create(data, transaction = null) {
        return Review_Like.create(data, {transaction});
    },

    // read
    findAll(options = {}, transaction = null) {
        return Review_Like.findAll({
            ...options,
            transaction
        })
    },

    findOne(reviewId, userId, transaction = null) {
        return Review_Like.findOne({
            where: {
                review_id: reviewId,
                user_id: userId
            },
            transaction
        })
    },

    // delete
    delete(reviewId, userId, transaction = null) {
        return Review_Like.destroy({
            where: {
                review_id: reviewId,
                user_id: userId
            },
            transaction
        })
    },

    restore(reviewId, userId, transaction = null) {
        return Review_Like.destroy({
            where: {
                review_id: reviewId,
                user_id: userId
            },
            transaction
        })
    }
}