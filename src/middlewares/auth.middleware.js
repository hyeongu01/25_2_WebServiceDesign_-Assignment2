const jwt = require("../utils/jwt");
const UnauthorizedError = require("../errors/Unauthorized");
const ForbiddenError = require("../errors/Forbidden");

module.exports = {
    authenticate(req, res, next) {
        const authHeader = req.get("authorization");

        if (!authHeader) {
            return next(new UnauthorizedError("Authorization 헤더가 없습니다."));
        }

        // 토큰 분리
        const token = authHeader.split(" ")[1];

        if (!token) {
            return next(new UnauthorizedError("JWT 토큰이 없습니다."));
        }
        console.log(token)

        try {
            const decoded = jwt.verifyAccessToken(token);
            req.user = decoded;
            
            
            next();
        } catch(err) {
            return next(new UnauthorizedError("JWT 토큰이 유효하지 않거나 만료되었습니다."))
        }
    },

    authenticateRole(allowedRoles = []) {
        return (req, res, next) => {
            // authenticate 미들웨어가 선행되어 req.user가 있어야 합니다.
            if (!req.user) {
                return next(new UnauthorizedError("인증 정보가 없습니다."));
            }

            // allowedRoles가 비어있다면 접근 허용
            if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
                return next();
            }

            const userRole = req.user.role;

            // 역할 정보가 없으면 권한 없음
            if (!userRole) {
                return next(new ForbiddenError("사용자 역할 정보가 없습니다."));
            }

            // 허용된 역할에 포함되는지 확인
            if (allowedRoles.includes(userRole)) {
                return next();
            }

            return next(new ForbiddenError("해당 리소스에 접근할 권한이 없습니다."));
        }
    }
}