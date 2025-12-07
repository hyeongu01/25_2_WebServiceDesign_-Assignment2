const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    hashed_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING(50),
        defaultValue: null,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        defaultValue: null,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM("CUSTOMER", "OWNER", "ADMIN"),
        defaultValue: "CUSTOMER",
    },
}, {
    timestamps: true,
    paranoid: true,
    tableName: "User",
    underscored: true
});

module.exports = User;
