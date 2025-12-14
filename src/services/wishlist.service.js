const NotFoundError = require("../errors/NotFound");
const WishlistRepository = require("../repositories/wishlist.repository");
const WishlistItemRepository = require("../repositories/wishlistItem.repository");
const BookRepository = require("../repositories/book.repository")

module.exports = {
    async findAll(userId) {
        const wishlist = await WishlistRepository.findOneByUserId(userId);

        if (!wishlist) {
            throw new NotFoundError(`user_id = ${userId} 의 위시리스트가 없습니다.`);
        }

        const items = await WishlistItemRepository.findAll({
            where: {
                wishlist_id: wishlist.id
            }
        });

        if (items.length === 0) {
            return []
        }

        const bookIds = items.map(item => item.book_id);

        const books = await BookRepository.findAll({
            where: {id: bookIds}
        })

        return books
    }
}