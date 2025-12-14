const UserRepository = require("../repositories/user.repository")
const CartRepository = require("../repositories/cart.repository")
const WishlistRepository = require("../repositories/wishlist.repository")
const RefreshTokenRepository = require("../repositories/refreshToken.repository");

const ConfilictError = require("../errors/Conflict");
const NotFoundError = require("../errors/NotFound");
const UnauthorizedError = require("../errors/Unauthorized")

const {hash, compare} = require("../utils/bcrypt")
const jwt = require("../utils/jwt")
const sequelize = require("../config/sequelize");
const BadRequestError = require("../errors/BasRequest");


module.exports = {
    async signup({username, password, name, email, phone}) {
        const transaction = await sequelize.transaction();

        try {
            
            // 중복 체크
            const user = await UserRepository.findOneByUsername(username, transaction);
            if (user) {
                throw new ConfilictError("이미 있는 username 입니다.");
            }

            // password 암호화
            const hashed_password = await hash(password)

            let newUser

            // User 생성
            try {
                newUser = await UserRepository.create({
                    username,
                    hashed_password,
                    name,
                    email,
                    phone
                }, transaction)
            } catch(err) {
                throw new ConfilictError("email 혹은 phone 이 중복됩니다.")
            }

            // cart 생성
            const newCart = await CartRepository.create({
                user_id: newUser.id
            }, transaction)

            // wishlist 생성
            const newWishlist = await WishlistRepository.create({
                user_id: newUser.id
            }, transaction)
            

            await transaction.commit();
            return newUser;
        } catch(err) {
            await transaction.rollback();
            throw err;
        }
    },

    async login(data) {
        const transaction = await sequelize.transaction();

        try {
            // username 으로 유저 불러오기
            const user = await UserRepository.findOneByUsername(data.username, {}, transaction);
            
            // 유저가 없으면 not found Error
            if (!user) {
                throw new NotFoundError("해당 username 을 가진 유저가 없습니다.");
            }

            // password 비교
            const match = await compare(data.password, user.hashed_password);

            if (!match) {
                throw new UnauthorizedError("비밀번호가 일치하지 않습니다.");
            }

            // accessToken, refreshToken 발급
            const accessToken = jwt.generateAccessToken({
                id: user.id,
                role: user.role
            })

            const refreshToken = jwt.generateRefreshToken({
                id: user.id
            })

            const expiredAt = jwt.verifyRefreshToken(refreshToken).exp * 1000;

            // refreshToken 을 저장
            await RefreshTokenRepository.create({
                user_id: user.id,
                token: refreshToken,
                expired_at: expiredAt
            }, transaction)

            await transaction.commit();

            return {
                accessToken,
                refreshToken,
                accessTokenExpiresAt: new Date(jwt.verifyAccessToken(accessToken).exp * 1000),
                user
            }
        } catch(err) {
            await transaction.rollback();
            throw err;
        }
    },

    async logout(user, refreshToken) {
        const transaction = await sequelize.transaction();

        try {
            // refreshToken 디코딩
            const userId = jwt.verifyRefreshToken(refreshToken).id

            if (!userId) {
                throw new UnauthorizedError("refreshToken 검증 실패");
            }

            if (user.id !== userId) {
                throw new UnauthorizedError("accessToken 과 refreshToken 의 소유자가 다릅니다.");
            }

            // refreshToken 비활성화
            const token = await RefreshTokenRepository.findOneByToken(refreshToken, transaction)
            
            if (!token) {
                throw new NotFoundError("refreshToken 이 없습니다.");
            }

            if (token.revoked_at !== null) {
                throw new UnauthorizedError("이미 로그아웃되었습니다.")
            }

            const [affectedCount] = await RefreshTokenRepository.revokeByToken(refreshToken, transaction);

            if (affectedCount === 0) {
                throw new NotFoundError("refreshToken 이 없거나, 이미 로그아웃되었습니다.")
            }

            await transaction.commit();

            return {
                message: "성공적으로 로그아웃 되었습니다."
            }
        } catch(err) {
            await transaction.rollback();
            throw err;
        }
    },

    async refresh(refreshToken) {
        const transaction = await sequelize.transaction();

        try {
            // refresh token 검증
            const decoded = jwt.verifyRefreshToken(refreshToken);

            // DB refreshToken 확인
            const token = await RefreshTokenRepository.findOneByToken(refreshToken, transaction);

            // 토큰이 있는지 확인
            if (!token) {
                throw new NotFoundError("refreshToken 이 존재하지 않습니다.");
            }

            // 토큰 유효한지 확인
            if (token.revoked_at !== null) {
                throw new UnauthorizedError("이미 로그아웃되었습니다.");
            }

            // 토큰 비활성화
            const [affected] = await RefreshTokenRepository.revokeById(token.id, transaction);

            // 유저 읽기
            const user = await UserRepository.findOneById(decoded.id, {}, transaction);

            if (affected === 0) {
                throw new NotFoundError("이미 로그아웃 되었습니다..");
            }

            // accsss, refresh 토큰 재발금
            const newAccessToken = jwt.generateAccessToken({
                id: user.id,
                role: user.role
            })

            const newRefreshToken = jwt.generateRefreshToken({
                id: user.id
            })

            // refresh 토큰 저장
            const expiredAt = jwt.verifyRefreshToken(newRefreshToken).exp * 1000;

            await RefreshTokenRepository.create({
                user_id: user.id,
                token: newRefreshToken,
                expired_at: expiredAt
            }, transaction)

            await transaction.commit();

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                accessTokenExpiresAt: new Date(jwt.verifyAccessToken(newAccessToken).exp * 1000),
                user
            }

        } catch(err) {
            await transaction.rollback();
            throw err;
        }
    }
}