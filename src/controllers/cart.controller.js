const CartService = require("../services/cart.service");
const BadRequestError = require("../errors/BasRequest");

module.exports = {
    async findAll(req, res) {
        try {
            const userId = Number(req.user?.id);
            if (!userId) throw new BadRequestError("로그인 정보가 없습니다.");

            const books = await CartService.findAll(userId);
            return res.status(200).json({ data: books, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async append(req, res) {
        try {
            const userId = Number(req.user?.id);
            const { bookId, quantity } = req.body || {};

            if (!userId) throw new BadRequestError("로그인 정보가 없습니다.");
            if (!bookId) throw new BadRequestError("bookId 가 필요합니다.");

            const result = await CartService.append(userId, Number(bookId), quantity !== undefined ? Number(quantity) : 1);
            return res.status(201).json({ data: result, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async update(req, res) {
        try {
            const userId = Number(req.user?.id);
            const bookId = Number(req.params.bookId);
            const payload = req.body || {};

            if (!userId) throw new BadRequestError("로그인 정보가 없습니다.");
            if (!bookId) throw new BadRequestError("path parameter: bookId 가 필요합니다.");

            const message = await CartService.update(userId, bookId, payload);
            return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async delete(req, res) {
        try {
            const userId = Number(req.user?.id);
            const bookId = Number(req.params.bookId);

            if (!userId) throw new BadRequestError("로그인 정보가 없습니다.");
            if (!bookId) throw new BadRequestError("path parameter: bookId 가 필요합니다.");

            const result = await CartService.delete(userId, bookId);
            return res.status(200).json({ data: result, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }
}