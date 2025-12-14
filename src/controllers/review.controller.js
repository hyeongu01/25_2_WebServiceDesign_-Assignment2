const ReviewService = require("../services/review.service");

const BadRequestError = require("../errors/BasRequest");
const NotFoundError = require("../errors/NotFound");

function sanitize(review) {
    if (!review) return review;
    return typeof review.toJSON === 'function' ? review.toJSON() : review;
}

module.exports = {
    async detail(req, res) {
        try {
            const id = Number(req.params.id);
            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");

            const review = await ReviewService.getById(id);
            return res.status(200).json({ data: sanitize(review), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.user?.id);
            const payload = req.body || {};

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");
            if (!userId) throw new BadRequestError("로그인 된 사용자가 필요합니다.");

            const updated = await ReviewService.update(id, userId, payload);
            return res.status(200).json({ data: sanitize(updated), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.user?.id);

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");
            if (!userId) throw new BadRequestError("로그인 된 사용자가 필요합니다.");

            const message = await ReviewService.delete(id, userId);
            return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async like(req, res) {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.user?.id);

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");
            if (!userId) throw new BadRequestError("로그인 된 사용자가 필요합니다.");

            const message = await ReviewService.like(id, userId);
            return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async likeStatus(req, res) {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.user?.id);

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");
            if (!userId) throw new BadRequestError("로그인 된 사용자가 필요합니다.");

            const status = await ReviewService.likeStatus(id, userId);
            return res.status(200).json({ data: status, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async unlike(req, res) {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.user?.id);

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");
            if (!userId) throw new BadRequestError("로그인 된 사용자가 필요합니다.");

            const message = await ReviewService.unlike(id, userId);
            return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }
}
