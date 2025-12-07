const { where } = require("sequelize");
const User = require("../models/User");

module.exports = {
    createUser(userData) {
        return User.create(userData);
    },

    findAll() {
        return User.findAll();
    },

    findById(id) {
        return User.findByPk(id);
    },

    findByUsername(username) {
        return User.findOne({where: {username}});
    },

    findByEmail(email) {
        return User.findOne({where: {email}});
    },

    updateUser(id, newData) {
        return User.update(newData, { where: { id }});
    },

    softDeleteUser(id) {
        return User.destroy({where: {id}});
    },

    restoreUser(id) {
        return User.restore({where: {id}});
    }
}


