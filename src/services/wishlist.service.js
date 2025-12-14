const NotFoundError = require("../errors/NotFound");
const WishlistRepository = require("../repositories/wishlist.repository");
const WishlistItemRepository = require("../repositories/wishlistItem.repository");
const BookRepository = require("../repositories/book.repository");

const sequelize = require("../config/sequelize");

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
    },

    async append(userId, bookId) {
        const transaction = await sequelize.transaction();

        try {
            // wishlist 읽기
            const wishlist = await WishlistRepository.findOneByUserId(userId, transaction);

            if (!wishlist) {
                throw new NotFoundError("유저의 wishlist 를 찾을 수 없습니다.");
            }

            // book 읽기
            const book = await BookRepository.findOneById(bookId, {}, transaction);
            
            if (!book) {
                throw new NotFoundError(`id = ${bookId} 인 책을 찾을 수 없습니다.`)
            }

            const itemData = {
                wishlist_id: wishlist.id,
                book_id: bookId
            }

            // 이미 있는걸 읽음
            const item = await WishlistItemRepository.findOne(itemData, transaction)

            let message = "";
            if (!item) {
                // 없으면 만들어
                await WishlistItemRepository.create(itemData, transaction);
                message = "item 을 새로 생성했습니다."
            } else {
                // 있으면 복구해봐
                const affected = await WishlistItemRepository.restore(itemData, transaction);
                if (affected === 0) {
                    message = "item 이 이미 존재합니다"
                } else {
                    message = "item 을 복구하였습니다."
                }
            }

            await transaction.commit();
            return { message }
        } catch(err) {
            await transaction.rollback()
            throw err
        }
    },

    async delete(userId, bookId) {
        const transaction = await sequelize.transaction()

        try {
            // wishlist 읽기
            const wishlist = await WishlistRepository.findOneByUserId(userId, transaction);
            
            if (!wishlist) throw new NotFoundError("유저의 wishlist 를 찾을 수 없습니다.");


            const affected = await WishlistItemRepository.delete({
                wishlist_id: wishlist.id,
                book_id: bookId
            }, transaction)

            if (affected === 0) {
                throw new NotFoundError(`wishlist 에 id = ${bookId} 인 책이 없습니다.`)
            }

            await transaction.commit()
            return {
                message: `wishlist 에서 id = ${bookId} 인 책이 삭제되었습니다. (삭제된 수: ${affected})`
            }
        } catch(err) {
            await transaction.rollback()
            throw err
        }
    }
}