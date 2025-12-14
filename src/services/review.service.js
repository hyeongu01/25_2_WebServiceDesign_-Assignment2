const sequelize = require("../config/sequelize");
const ReviewRepository = require("../repositories/review.repository");
const ReviewLikeRepository = require("../repositories/reviewLike.repository");
const BookRepository = require("../repositories/book.repository");

const NotFoundError = require("../errors/NotFound");
const BadRequestError = require("../errors/BasRequest");
const ForbiddenError = require("../errors/Forbidden");
const ConflictError = require("../errors/Conflict");

module.exports = {
    async getById(id) {
        const review = await ReviewRepository.findById(id);
        if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다.");
        return review;
    },

    async update(id, userId, payload) {
        const transaction = await sequelize.transaction();
        try {
            const review = await ReviewRepository.findById(id, {}, transaction);
            if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다.");

            if (review.user_id !== userId) {
                throw new ForbiddenError("권한이 없습니다.");
            }

            await ReviewRepository.update(id, payload, transaction);
            const updated = await ReviewRepository.findById(id, {}, transaction);
            await transaction.commit();
            return updated;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async delete(id, userId) {
        const transaction = await sequelize.transaction();
        try {
            const review = await ReviewRepository.findById(id, {}, transaction);
            if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다.");

            if (review.user_id !== userId) {
                throw new ForbiddenError("권한이 없습니다.");
            }

            await ReviewRepository.delete(id, transaction);
            await transaction.commit();
            return { message: "삭제 성공" };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async like(reviewId, userId) {
        const transaction = await sequelize.transaction();
        try {
            const review = await ReviewRepository.findById(reviewId, {}, transaction);
            if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다.");

            const existing = await ReviewLikeRepository.findOne(reviewId, userId, transaction);
            if (existing) throw new ConflictError("이미 좋아요를 누른 리뷰입니다.");

            await ReviewLikeRepository.create({ review_id: reviewId, user_id: userId }, transaction);
            // increment like count
            await review.increment('like_count', { by: 1, transaction });
            await transaction.commit();
            return { message: "좋아요 완료" };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async unlike(reviewId, userId) {
        const transaction = await sequelize.transaction();
        try {
            const review = await ReviewRepository.findById(reviewId, {}, transaction);
            if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다.");

            const existing = await ReviewLikeRepository.findOne(reviewId, userId, transaction);
            if (!existing) throw new NotFoundError("좋아요한 리뷰가 아닙니다.");

            await ReviewLikeRepository.delete(reviewId, userId, transaction);
            await review.decrement('like_count', { by: 1, transaction });
            await transaction.commit();
            return { message: "좋아요 취소 완료" };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async likeStatus(reviewId, userId) {
        const like = await ReviewLikeRepository.findOne(reviewId, userId);
        return { liked: !!like };
    }
}
