const {RefreshToken} = require("../models");

module.exports = {
    create(data, transaction = null) {
        return RefreshToken.create(data, {transaction})
    },

    findOneByToken(token, transaction = null) {
        return RefreshToken.findOne({where: {token}, transaction})
    },

    findAllByUserId(userId, transaction = null) {
        return RefreshToken.findAll({where: {user_id: userId}, transaction})
    },

    deleteByToken(token, transaction = null) {
        return RefreshToken.destroy({where: {token}, transaction})
    },

    revokeById(id, transaction = null) {
        return RefreshToken.update(
            {revoked_at: new Date()},
            {where: {id}, transaction}
        )
    },

    revokeByToken(token, transaction = null) {
        return RefreshToken.update(
            {revoked_at: new Date()}, 
            {where: {token}, transaction}
        );
    },

    deleteByUserId(userId, transaction = null) {
        return RefreshToken.destroy({
            where: {user_id: userId},
            transaction
        });
    }
}
