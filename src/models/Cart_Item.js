const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Cart_Item = sequelize.define("Cart_Item", {
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    is_checked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
    timestamps: false,
    tableName: "Cart_Item",
    underscored: true,
});

module.exports = Cart_Item;
