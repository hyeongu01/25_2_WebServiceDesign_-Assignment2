const WishlistService = require("../services/wishlist.service")

module.exports = {
    async findAll(req, res) {
        console.log('findAll')
        try {
            // processing
            const books = await WishlistService.findAll(req.user.id);
            return res.status(200).json({
                data: books,
                meta: {timestamp: new Date()}
            })
        } catch (err) {
            // if service threw a known error, forward it; otherwise wrap
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async append(req, res) {

    },

    async delete(req, res) {

    }
}