const { Review } = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Review.create(data, { transaction });
    },

    findAllByBookId(bookId, options = {}, transaction = null) {
        return Review.findAll({ where: { book_id: bookId }, ...options, transaction });
    }

    ,
    findById(id, options = {}, transaction = null) {
        return Review.findOne({ where: { id }, ...options, transaction });
    },

    update(id, data, transaction = null) {
        return Review.update(data, { where: { id }, transaction });
    },

    delete(id, transaction = null) {
        return Review.destroy({ where: { id }, transaction });
    }
}
