const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Author = sequelize.define("Author", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    birth: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
    },
    description: {
        type: DataTypes.STRING(1000),
        defaultValue: null,
    },
}, {
    timestamps: false,
    tableName: "Author",
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ["name", "birth"]
        }
    ]
});

module.exports = Author;
