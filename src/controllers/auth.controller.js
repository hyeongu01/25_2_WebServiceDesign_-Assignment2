const BadRequestError = require("../errors/BasRequest");
const authService = require("../services/auth.service");
const NotFoundError = require("../errors/NotFound");

module.exports = {
    // 회원가입
    async signup(req, res) {
        try {
            // input validation
            const {username, password, email, name, phone} = req.body;
            
            if (!username) {
                throw new BadRequestError("username 이 없습니다.");
            }

            if (!password) {
                throw new BadRequestError("password 가 없습니다.");
            }

            if (!name) {
                throw new BadRequestError("name 이 없습니다.");
            }

            // processing
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


        try {
            // input validation
            const {username, password} = req.body;

            if (!username) {
                throw new BadRequestError("username 이 없습니다.");
            }

            if (!password) {
                throw new BadRequestError("password 이 없습니다.");
            }

            // processing
            const data = await authService.login({ username, password });
            return res.status(200).json({ data, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async logout(req, res) {


        try {
            // input validation
            const {refreshToken} = req.body;

            if (!refreshToken) {
                throw new BadRequestError("refreshToken 필드 누락");
            }

            // processing
            const data = await authService.logout(req.user, refreshToken);
            return res.status(200).json({ data, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async refresh(req, res) {
        try {
            // input validation
            const {refreshToken} = req.body;

            if (!refreshToken) {
                const error = new BadRequestError("refreshToken 필드 누락");
                return res.status(error.statusCode).json(error.response());
            }

            // processing
            const data = await authService.refresh(refreshToken);
            return res.status(201).json({ data, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }
}
