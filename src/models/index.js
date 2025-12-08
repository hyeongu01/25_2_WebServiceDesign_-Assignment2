const sequelize = require("../config/sequelize");

// 모델 불러오기
const User = require("./User");
const RefreshToken = require("./RefreshToken");
const Wishlist = require("./Wishlist");

// 관계 설정
User.hasMany(RefreshToken, { foreignKey: "user_id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id" });

// wishlist user
User.hasOne(Wishlist, { foreignKey: "user_id" });
Wishlist.belongsTo(User, { foreignKey: "user_id" });

// models 객체 내보내기
const db = {};
db.sequelize = sequelize;
db.User = User;
db.RefreshToken = RefreshToken;

module.exports = {
    sequelize,
    User,
    Wishlist,
    RefreshToken,
};
