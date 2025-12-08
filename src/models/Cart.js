const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Cart = sequelize.define("Cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
}, {
    timestamps: false,
    tableName: "Cart",
    underscored: true,
});

module.exports = Cart;
