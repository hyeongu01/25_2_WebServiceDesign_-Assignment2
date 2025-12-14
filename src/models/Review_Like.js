const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Review_Like = sequelize.define("Review_Like", {
    review_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    deleted_at: { type: DataTypes.DATE, defaultValue: null },
}, {
    timestamps: false,
    tableName: "Review_Like",
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "review_id"]
        }
    ],
});

module.exports = Review_Like;
