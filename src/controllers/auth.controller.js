const BadRequestError = require("../errors/BasRequest");
const authService = require("../services/auth.service");
const NotFoundError = require("../errors/NotFound");

module.exports = {
    // 회원가입
    async signup(req, res) {
        // 입력 검증
        const {username, password, email, name, phone} = req.body;
        
        if (!username) {
            const error = new BadRequestError("username 이 없습니다.");
            return res.status(error.statusCode).json(error.response())
        }

        if (!password) {
            const error = new BadRequestError("password 가 없습니다.");
            return res.status(error.statusCode).json(error.response())
        }

        if (!name) {
            const error = new BadRequestError("name 이 없습니다.");
            return res.status(error.statusCode).json(error.response());
        }

        try {
            const user = await authService.signup({
                username,
                password,
                email,
                name,
                phone
            })

            return res.status(201).json({ data: { user }, meta: { timestamp: Date.now() } });
        } catch (err) {
            // if service threw a known error, forward it; otherwise wrap
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    // 로그인
    async login(req, res) {
        // 입력 검증
        const {username, password} = req.body;

        if (!username) {
            const error = new BadRequestError("username 이 없습니다.");
            return res.status(error.statusCode).json(error.response());
        }

        if (!password) {
            const error = new BadRequestError("password 이 없습니다.");
            return res.status(error.statusCode).json(error.response());
        }

        try {
            const data = await authService.login({ username, password });
            return res.status(200).json({ data, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async logout(req, res) {
        // refresh Token 이 있는지 검증
        const {refreshToken} = req.body;

        if (!refreshToken) {
            const error = new BadRequestError("refreshToken 필드 누락");
            return res.status(error.statusCode).json(error.response());
        }

        try {
            const data = await authService.logout(req.user, refreshToken);
            return res.status(200).json({ data, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async refresh(req, res) {
        const {refreshToken} = req.body;

        if (!refreshToken) {
            const error = new BadRequestError("refreshToken 필드 누락");
            return res.status(error.statusCode).json(error.response());
        }

        try {
            const data = await authService.refresh(req.user, refreshToken);
            return res.status(201).json({ data, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }
}
