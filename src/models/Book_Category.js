const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Book_Category = sequelize.define("Book_Category", {
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Book_Category",
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ["book_id", "category_id"]
        }
    ]
});

module.exports = Book_Category;
