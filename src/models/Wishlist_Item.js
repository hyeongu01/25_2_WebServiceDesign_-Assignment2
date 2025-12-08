const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Wishlist_Item = sequelize.define("Wishlist_Item", {
    wishlist_id: { type: DataTypes.INTEGER, allowNull: false },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, defaultValue: null },
}, {
    timestamps: false,
    tableName: "Wishlist_Item",
    underscored: true,
});


module.exports = Wishlist_Item;
