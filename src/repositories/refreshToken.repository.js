const RefreshToken = require("../models/RefreshToken");
require('dotenv').config({path: "./src/config/.env"})

const period = Number(process.env.REFRESH_TOKEN_PERIOD) || 604800000;

module.exports = {
    createToken(userId, token) {
        return RefreshToken.create({
            user_id: userId,
            token: token,
            expired_at: Date.now() + period
        })
    },

    findByToken(token) {
        return RefreshToken.findOne({where: {token}})
    },

    findByUserId(userId) {
        return RefreshToken.findAll({where: {user_id: userId}})
    },

    deleteToken(token) {
        return RefreshToken.destroy({where: {token}})
    },

    revokeToken(token) {
        return RefreshToken.update(
            {revoked_at: Date.now()}, 
            {where: {token}}
        );
    },

    deleteTokenByUserId(userId) {
        return RefreshToken.destroy({
            where: {user_id: userId}
        });
    }
}