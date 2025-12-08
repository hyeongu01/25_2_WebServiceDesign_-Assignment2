const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Wishlist = sequelize.define("Wishlist", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
})

sequelize.sync({alter: true})

module.exports = Wishlist;
