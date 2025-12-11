const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_SECRET = process.env.ACCESS_SECRET || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret";

module.exports = {
    // Access Token 생성
    generateAccessToken(payload) {
        return jwt.sign(payload, ACCESS_SECRET, {
            expiresIn: "1h" // Access Token 시간
        });
    },

    // Refresh Token 생성
    generateRefreshToken(payload) {
        return jwt.sign(payload, REFRESH_SECRET, {
            expiresIn: "7d" // Refresh Token 시간
        });
    },

    verifyAccessToken(token) {
        return jwt.verify(token, ACCESS_SECRET);
    },

    verifyRefreshToken(token) {
        return jwt.verify(token, REFRESH_SECRET);
    }
};
