const UserService = require("../services/users.service");

// 에러 코드
const BadRequestError = require("../errors/BasRequest");
const UnauthorizedError = require("../errors/Unauthorized");
const NotFoundError = require("../errors/NotFound");

// Helper: sanitize returned user objects to remove sensitive fields
function sanitizeUser(user) {
    if (!user) return user;
    const raw = (typeof user.toJSON === 'function') ? user.toJSON() : user;
    const { hashed_password, ...rest } = raw;
    return rest;
}

module.exports = {
    async getUserById(req, res) {
        // 입력 검증
        const userId = Number(req.params.id);

        if (!userId) {
            throw new BadRequestError("path parameter: {id} 가 없습니다.");
        }

        // 내부연산
        try {
            const data = await UserService.getUserById(userId);

            return res.status(200).json({
                data: data,
                meta: {
                    timestamp: new Date()
                }
            });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async getMyUser(req, res) {
        // 입력 검증
        const userId = Number(req.user?.id);

        if (!userId) {
            throw new UnauthorizedError("로그인 되어 있지 않습니다.");
        }

        // 내부 연산
        try {
            const user = await UserService.getUserById(userId);
            return res.status(200).json({ data: user, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async getAllUsers(req, res) {
        // 입력 검증
        // 내부 연산
        try {
            const users = await UserService.getAllUsers();

            if (!users || users.length === 0) {
                throw new NotFoundError("조회할 유저가 없습니다.");
            }

            const safe = users.map(sanitizeUser);
            return res.status(200).json({
                data: safe,
                meta: {timestamp: new Date()}
            })

        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async deleteUser(req, res) {
        // 입력 검증
        const id = Number(req.params.id);

        if (!id) {
            throw new BadRequestError("path parameter: {id} 가 없습니다.");
        }

        // 내부 연산
        try {
            await UserService.softDeleteUser(id);
            return res.status(200).json({ data: { message: "유저 삭제 완료" }, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async restoreUser(req, res) {
        // 입력 검증
        const id = Number(req.params.id);

        if (!id) {
            throw new BadRequestError("path parameter: {id} 가 없습니다.");
        }

        // 내부 연산
        try {
            await UserService.restoreUser(id);
            return res.status(200).json({ data: { message: "유저 복구 완료" }, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async updateUser(req, res) {
        // 입력 검증
        const id = Number(req.params.id);
        const payload = req.body;

        if (!id) {
            throw new BadRequestError("path parameter: {id} 가 없습니다.");
        }

        // 내부 연산
        try {
            const updated = await UserService.updateUser(id, payload);
            return res.status(200).json({ data: sanitizeUser(updated), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async updateMyUser(req, res) {
        const id = Number(req.user?.id);
        const payload = req.body;

        if (!id) {
            throw new BadRequestError("로그인 정보가 없습니다.");
        }

        try {
            const updated = await UserService.updateUser(id, payload);
            return res.status(200).json({ data: sanitizeUser(updated), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async changeMyPassword(req, res) {
        const id = Number(req.user?.id);
        const { oldPassword, newPassword } = req.body;

        if (!id) {
            throw new BadRequestError("로그인 정보가 없습니다.");
        }

        if (!oldPassword || !newPassword) {
            throw new BadRequestError("oldPassword 또는 newPassword가 없습니다.");
        }

        try {
            await UserService.changePassword(id, oldPassword, newPassword);
            return res.status(200).json({ data: { message: "비밀번호 변경 완료" }, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async deleteMyUser(req, res) {
        const id = Number(req.user?.id);
        if (!id) {
            throw new BadRequestError("로그인 정보가 없습니다.");
        }
        try {
            await UserService.softDeleteUser(id);
            return res.status(200).json({ data: { message: "유저 삭제 완료" }, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },
}