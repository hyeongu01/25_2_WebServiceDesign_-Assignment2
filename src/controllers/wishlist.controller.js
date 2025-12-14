const BadRequestError = require("../errors/BasRequest");
const WishlistService = require("../services/wishlist.service")

module.exports = {
    async findAll(req, res) {
        try {
            // processing
            const books = await WishlistService.findAll(req.user.id);
            return res.status(200).json({
                data: books,
                meta: {timestamp: new Date()}
            })
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async append(req, res) {
        try {
            // input validation
            const userId = Number(req.user.id)
            const bookId = Number(req.body.bookId);

            if (!bookId) {
                throw new BadRequestError("bookId 는 필수입니다.")
            }

            // processing
            const message = await WishlistService.append(userId, bookId);
            return res.status(201).json({
                data: message,
                meta: {timestamp: new Date()}
            })
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async delete(req, res) {
        try {
            // input validation
            const userId = Number(req.user.id);
            const bookId = Number(req.params.bookId);

            if (!bookId) throw new BadRequestError("bookId 항목 누락");

            // processing
            const message = await WishlistService.delete(userId, bookId);
            return res.status(200).json({
                data: message,
                meta: {timestamp: new Date()}
            })
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }
}