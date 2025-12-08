const { where } = require("sequelize");

const {User} = require("../models");

module.exports = {
    createUser(userData, transaction = null) {
        return User.create(userData, { transaction });
    },

    findAll(transaction = null) {
        return User.findAll({ transaction });
    },

    findById(id, transaction = null) {
        return User.findByPk(id, { transaction });
    },

    findByUsername(username, transaction = null) {
        return User.findOne({
            where: { username },
            transaction
        });
    },

    findByEmail(email, transaction = null) {
        return User.findOne({
            where: { email },
            transaction
        });
    },

    updateUser(id, newData, transaction = null) {
        return User.update(newData, {
            where: { id },
            transaction
        });
    },

    softDeleteUser(id, transaction = null) {
        return User.destroy({
            where: { id },
            transaction
        });
    },

    restoreUser(id, transaction = null) {
        return User.restore({
            where: { id },
            transaction
        });
    }
};
