const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Wishlist_Item = sequelize.define("Wishlist_Item", {
    wishlist_id: { type: DataTypes.INTEGER, allowNull: false },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: true,
    tableName: "Wishlist_Item",
    paranoid: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ["wishlist_id", "book_id"]
        }
    ]
});


module.exports = Wishlist_Item;
