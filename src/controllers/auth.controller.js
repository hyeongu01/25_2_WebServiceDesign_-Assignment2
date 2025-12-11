const BadRequestError = require("../errors/BasRequest")
const authService = require("../services/auth.service")
const NotFoundError = require("../errors/BasRequest")

module.exports = {
    // 회원가입
    signup(req, res) {
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

        authService.signup({
            username,
            password,
            email,
            name,
            phone
        }).then(user => {
            return res.status(201).json({
                data: {
                    user
                },
                meta: {
                    timestamp: Date.now()
                }
            })
        }).catch(err => {
            console.log(err)
            const customError = new NotFoundError(err.message);
            return res.status(Number(customError.statusCode)).json(customError.response());
        })
    },

    // 로그인
    login(req, res) {
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

        authService.login({
            username, 
            password
        }).then(data => {
            return res.status(200).json({
                data: data,
                meta: {
                    timestamp: new Date()
                }
            })
        }).catch(err => {
            return res.status(err.statusCode).json(err.response())
        })
    },

    logout(req, res) {
        // refresh Token 이 있는지 검증
        const {refreshToken} = req.body;

        if (!refreshToken) {
            const error = new BadRequestError("refreshToken 필드 누락");
            return res.status(error.statusCode).json(error.response());
        }

        authService.logout(req.user, refreshToken)
            .then(data => {
                return res.status(200).json({
                    data: data,
                    meta: {
                        timestamp: new Date()
                    }
                })
            }).catch(err => {
                return res.status(err.statusCode).json(err.response());
            })
    },

    refresh(req, res) {
        const {refreshToken} = req.body;

        if (!refreshToken) {
            const error = new BadRequestError("refreshToken 필드 누락");
            return res.status(error.statusCode).json(error.response());
        }

        authService.refresh(req.user, refreshToken)
            .then(data => {
                return res.status(201).json({
                    data: data,
                    meta: {
                        timestamp: new Date()
                    }
                })
            }).catch(err => {
                return res.status(err.statusCode).json(err.response());
            })
    }
}
