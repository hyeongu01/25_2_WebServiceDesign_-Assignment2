const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

module.exports = {
    // 회원가입 로직
    async registerUser({ username, password, name, email, phone }) {
        const exists = await userRepo.findByUsername(username);
        if (exists) throw new Error("이미 존재하는 사용자입니다.");

        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = await userRepo.createUser({
            username,
            hashed_password,
            name,
            email,
            phone,
            role: "CUSTOMER",
        });

        return newUser;
    },

    async getUserById(id) {
        const user = await userRepo.findById(id);
        if (!user) throw new Error("사용자를 찾을 수 없습니다.");
        return user;
    },

    async updateUser(id, data) {
        return await userRepo.updateUser(id, data);
    },

    async deleteUser(id) {
        return await userRepo.softDeleteUser(id);
    },
};
