const {RefreshToken} = require("../models");
require('dotenv').config({path: "./src/config/.env"})

const period = Number(process.env.REFRESH_TOKEN_PERIOD) || 604800000;

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
