const {Book_Category} = require("../models");

module.exports = {
    create(data, transaction = null) {
        return Book_Category.create(data, {transaction});
    },

    delete(data, transaction = null) {
        return Book_Category.destroy({where: data, transaction});
    }
}