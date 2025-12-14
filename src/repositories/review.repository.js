const { Review } = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Review.create(data, { transaction });
    },

    findAllByBookId(bookId, options = {}, transaction = null) {
        return Review.findAll({ where: { book_id: bookId }, ...options, transaction });
    }
}
