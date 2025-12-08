const {Category} = require("../models");

module.exports = {
    // c
    create(data, transaction = null) {
        return Category.create(data, {transaction});
    },

    // r
    findAll(options = {}, transaction = null) {
        return Category.findAll({...options, transaction});
    },

    findOneById(id, transaction = null) {
        return Category.findByPk(id, {transaction});
    },

    // d
    delete(id, transaction = null) {
        return Category.destroy({where: {id}, transaction});
    }
}
