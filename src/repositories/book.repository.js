const {Book} = require("../models");

module.exports = {
    // create book
    create(bookData, transaction = null) {
        return Book.create(bookData, {transaction});
    },

    // read book
    findAll(options = {}, transaction = null) {
        return Book.findAll({...options, transaction});
    },

    // read book by id
    findOneById(id, options = {}, transaction = null) {
        return Book.findByPk(id, {...options, transaction});
    },

    // update book
    update(id, newBookData, transaction = null) {
        return Book.update(newBookData, {where: {id}, transaction});
    },

    // delete book
    delete(id, transaction = null) {
        return Book.destroy({where: {id}, transaction});
    },

    restore(id, transaction = null) {
        return Book.restore({where: {id}, transaction})
    }
}

// test
// module.exports.create({
//     title: "testBook",
//     publisher: "ewtew",
//     published_date: Date.now(),
//     isbn: "sssssssssssss",
//     pages: 100,
//     description: "testBook desc",
//     price: 35000,
//     stock_quantity: 20,
//     seller_id: 1
// })