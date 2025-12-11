const {User} = require("../models");

module.exports = {
    create(userData, transaction = null) {
        return User.create(userData, { transaction });
    },

    findAll(options = {}, transaction = null) {
        return User.findAll({ ...options, transaction });
    },

    findOneById(id, options = {}, transaction = null) {
        return User.findByPk(id, { ...options, transaction });
    },

    findOneByUsername(username, options = {}, transaction = null) {
        return User.findOne({
            where: { username },
            ...options,
            transaction
        });
    },

    findOneByEmail(email, transaction = null) {
        return User.findOne({
            where: { email },
            transaction
        });
    },

    update(id, newData, transaction = null) {
        return User.update(newData, {
            where: { id },
            transaction
        });
    },

    delete(id, transaction = null) {
        return User.destroy({
            where: { id },
            transaction
        });
    },

    restore(id, transaction = null) {
        return User.restore({
            where: { id },
            transaction
        });
    }
};

// module.exports.create({
//     username: "admin",
//     hashed_password: "hashedpassword",
//     name: "최현우"
// })