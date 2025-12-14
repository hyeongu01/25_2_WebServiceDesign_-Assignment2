const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    publisher: {
        type: DataTypes.STRING(100),
        defaultValue: null,
    },
    published_date: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
    },
    isbn: {
        type: DataTypes.CHAR(13),
        unique: true,
        defaultValue: null,
    },
    pages: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cover_image_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
    },
    view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    paranoid: true,
    tableName: "Book",
    underscored: true,
});

module.exports = Book;
