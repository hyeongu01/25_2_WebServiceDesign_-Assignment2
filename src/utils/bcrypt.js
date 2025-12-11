const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = Number(process.env.SALT) || 10;

module.exports = {
    async hash(password) {
        return await bcrypt.hash(password, saltRounds);
    },

    async compare(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}