const UserRepository = require("../repositories/user.repository")
const ConfilictError = require("../errors/Conflict");
const bcrypt = require("bcrypt");
const sequelize = require("../config/sequelize");


module.exports = {
    async signup({username, password, name, email, phone}) {
        const transaction = await sequelize.transaction();

        try {
            // 중복 체크
            const user = await UserRepository.findByUsername(username, transaction);
            if (user) {
                throw new ConfilictError("이미 있는 username 입니다.");
            }

            // password 암호화
            const hashed_password = await bcrypt.hash(password, 10);

            // User 생성
            const newUser = await UserRepository.createUser({
                username,
                hashed_password,
                name,
                email,
                phone
            }, transaction)

            // cart 생성

            // wishlist 생성

            await transaction.commit();
            return newUser;
        } catch(err) {
            await transaction.rollback();
            throw err;
        }
    },

    login() {

    }
}