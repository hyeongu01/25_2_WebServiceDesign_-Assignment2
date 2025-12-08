const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Review = sequelize.define("Review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    like_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
    timestamps: true,
    paranoid: true,
    tableName: "Review",
    underscored: true,
});

module.exports = Review;
