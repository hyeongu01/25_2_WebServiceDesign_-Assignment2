const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Order = sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM(
        "PENDING","PAID","PROCESSING","SHIPPED","DELIVERED","COMPLETED","CANCELED","REFUNDED","RETURN_REQUESTED","RETURNED","REFUND"
    ), allowNull: false, defaultValue: "PENDING" },
}, {
    timestamps: true,
    paranoid: true,
    tableName: "Order",
    underscored: true,
});

module.exports = Order;
