const {Book_Author} = require("../models");

module.exports = {
    // c
    create(data, transaction = null) {
        return Book_Author.create(data, {transaction});
    },

    // d
    delete(data, transaction = null) {
        return Book_Author.destroy({
            where: data, 
            transaction
        });
    }
}

// module.exports.create({
//     book_id: 2,
//     author_id: 1
// })