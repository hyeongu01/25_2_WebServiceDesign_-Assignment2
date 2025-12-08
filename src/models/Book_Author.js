const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Book_Author = sequelize.define("Book_Author", {
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Book_Author",
    underscored: true,
});

module.exports = Book_Author;
