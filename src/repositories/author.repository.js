const {Author} = require("../models");

module.exports = {
    // c
    create(authorData, transaction = null) {
        return Author.create(authorData, {transaction});
    },

    // r
    findAll({options = {}, transaction = null} = {}) {
        return Author.findAll({...options, transaction});
    },

    findOneById(id, transaction = null) {
        return Author.findByPk(id, {transaction});
    },

    // u
    update(id, newData, transaction = null) {
        return Author.update(newData, {
            where: {id},
            transaction
        })
    },

    // d
    delete(id, transaction = null) {
        return Author.destroy({
            where: {id},
            transaction
        })
    }
}

// module.exports.create({
//     name: "히가시노"
// })