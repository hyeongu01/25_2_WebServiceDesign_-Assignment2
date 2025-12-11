const jwt = require("../utils/jwt");
const UnauthorizedError = require("../errors/Unauthorized");

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

        }
    }
}