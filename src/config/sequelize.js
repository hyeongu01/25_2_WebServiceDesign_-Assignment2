const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,     // 데이터베이스 이름
    process.env.DB_USER,     // 유저명
    process.env.DB_PASSWORD, // 비밀번호
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
    }
);

module.exports = sequelize;
