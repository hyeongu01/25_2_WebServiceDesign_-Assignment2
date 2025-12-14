const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Order_Item = sequelize.define("Order_Item", {
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price_at_order: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
    tableName: "Order_Item",
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ["order_id", "book_id"]
        }
    ]
});

module.exports = Order_Item;
