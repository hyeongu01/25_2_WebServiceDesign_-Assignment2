const BadRequestError = require("../errors/BasRequest")
const authService = require("../services/auth.service")

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
            return res.status(Number(err.statusCode) || 404).json(err.response() || {error: "DB Error!", message: "DB Error!"});
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
    }
}
