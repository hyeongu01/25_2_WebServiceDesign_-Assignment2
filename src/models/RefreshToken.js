const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");

const RefreshToken = sequelize.define("Refresh_Token", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    token: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    expired_at: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    revoked_at: { 
        type: DataTypes.DATE 
    },
});


module.exports = RefreshToken;
