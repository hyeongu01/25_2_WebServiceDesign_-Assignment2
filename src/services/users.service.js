const sequelize = require("../config/sequelize");
const UserRepository = require("../repositories/user.repository");

// 에러 코드
const NotFoundError = require("../errors/NotFound");
const ForbiddenError = require("../errors/Forbidden");

module.exports = {
    async getUserById(id) {
        // 유저 불러오기
        const user = await UserRepository.findOneById(id);

        if (!user) {
            throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
        }
        return user;
    },

    async getMyUser(id) {
        const user = await UserRepository.findOneById(id);

        if (!user) {
            throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
        }

        if (req.user.id !== user.id) {
            throw new ForbiddenError("접근 권한이 없습니다.")
        }

        return user;
    }
    ,

    async getAllUsers() {
        const users = await UserRepository.findAll();
        return users;
    },

    async updateUser(id, newData) {
        const transaction = await sequelize.transaction();

        try {
            // 유저 확인
            const user = await UserRepository.findOneById(id, {}, transaction);
            if (!user) {
                throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
            }

            const [affected] = await UserRepository.update(id, newData, transaction);
            if (affected === 0) {
                throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
            }

            await transaction.commit();
            return await UserRepository.findOneById(id, {}, null);
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async changePassword(id, oldPassword, newPassword) {
        const transaction = await sequelize.transaction();
        const { compare, hash } = require("../utils/bcrypt");

        try {
            const user = await UserRepository.findOneById(id, {}, transaction);
            if (!user) {
                throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
            }

            const match = await compare(oldPassword, user.hashed_password);
            if (!match) {
                const UnauthorizedError = require("../errors/Unauthorized");
                throw new UnauthorizedError("기존 비밀번호가 일치하지 않습니다.");
            }

            const hashed = await hash(newPassword);
            const [affected] = await UserRepository.update(id, { hashed_password: hashed }, transaction);
            if (affected === 0) {
                throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
            }

            await transaction.commit();
            return true;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async softDeleteUser(id) {
        const transaction = await sequelize.transaction();
        try {
            const affected = await UserRepository.delete(id, transaction);
            if (affected === 0) {
                throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
            }
            await transaction.commit();
            return true;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async restoreUser(id) {
        const transaction = await sequelize.transaction();
        try {
            const affected = await UserRepository.restore(id, transaction);
            if (affected === 0) {
                throw new NotFoundError(`user_id: ${id} 인 유저가 없습니다.`);
            }
            await transaction.commit();
            return true;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
