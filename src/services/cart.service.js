const sequelize = require("../config/sequelize");
const CartRepository = require("../repositories/cart.repository");
const CartItemRepository = require("../repositories/cartItem.repository");
const BookRepository = require("../repositories/book.repository");

const NotFoundError = require("../errors/NotFound");
const BadRequestError = require("../errors/BasRequest");

module.exports = {
    async findAll(userId) {
        const cart = await CartRepository.findOneByUserId(userId);
        if (!cart) throw new NotFoundError(`user_id = ${userId} 의 카트가 없습니다.`);

        const items = await CartItemRepository.findAll({ where: { cart_id: cart.id } });

        if (!items || items.length === 0) return [];

        const bookIds = items.map(i => i.book_id);
        const books = await BookRepository.findAll({ where: { id: bookIds } });

        const bookMap = new Map();
        books.forEach(b => {
            const obj = (typeof b.toJSON === 'function') ? b.toJSON() : b;
            bookMap.set(obj.id, obj);
        });

        const result = items.map(it => {
            const plain = (typeof it.toJSON === 'function') ? it.toJSON() : it;
            return {
                book: bookMap.get(plain.book_id) || null,
                quantity: plain.quantity
            }
        });

        return result;
    },

    async append(userId, bookId, quantity = 1) {
        if (!bookId) throw new BadRequestError("bookId 가 필요합니다.");
        if (typeof quantity !== 'number' || quantity <= 0) throw new BadRequestError("quantity 는 1 이상의 숫자여야 합니다.");

        const transaction = await sequelize.transaction();
        try {
            const cart = await CartRepository.findOneByUserId(userId, transaction);
            if (!cart) throw new NotFoundError("유저의 cart 를 찾을 수 없습니다.");

            // validate book exists
            const book = await BookRepository.findOneById(bookId, {}, transaction);
            if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

            const existing = await CartItemRepository.findById(cart.id, bookId, transaction);
            let message = "";
            if (!existing) {
                await CartItemRepository.create({ cart_id: cart.id, book_id: bookId, quantity }, transaction);
                message = "item 을 새로 생성했습니다.";
            } else {
                const newQty = existing.quantity + quantity;
                await CartItemRepository.update(cart.id, bookId, { quantity: newQty }, transaction);
                message = "기존 item 수량을 증가시켰습니다.";
            }

            await transaction.commit();
            return { message };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async update(userId, bookId, newData) {
        const transaction = await sequelize.transaction();
        try {
            const cart = await CartRepository.findOneByUserId(userId, transaction);
            if (!cart) throw new NotFoundError("유저의 cart 를 찾을 수 없습니다.");

            const existing = await CartItemRepository.findById(cart.id, bookId, transaction);
            if (!existing) throw new NotFoundError(`cart 에 id = ${bookId} 인 책이 없습니다.`);

            const payload = {};
            if (newData.quantity !== undefined) {
                if (typeof newData.quantity !== 'number' || newData.quantity <= 0) {
                    throw new BadRequestError("quantity 는 1 이상의 숫자여야 합니다.");
                }
                payload.quantity = newData.quantity;
            }

            if (newData.is_checked !== undefined) {
                payload.is_checked = !!newData.is_checked;
            }

            if (Object.keys(payload).length === 0) {
                throw new BadRequestError("수정할 필드가 없습니다.");
            }

            const [affected] = await CartItemRepository.update(cart.id, bookId, payload, transaction);
            if (affected === 0) throw new NotFoundError(`cart 에 id = ${bookId} 인 책이 없습니다.`);

            await transaction.commit();
            return {
                message: `cart 를 업데이트 했습니다. (변경된 수: ${affected})`
            };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async delete(userId, bookId) {
        const transaction = await sequelize.transaction();
        try {
            const cart = await CartRepository.findOneByUserId(userId, transaction);
            if (!cart) throw new NotFoundError("유저의 cart 를 찾을 수 없습니다.");

            const affected = await CartItemRepository.delete(cart.id, bookId, transaction);
            if (affected === 0) throw new NotFoundError(`cart 에 id = ${bookId} 인 책이 없습니다.`);

            await transaction.commit();
            return { message: `cart 에서 id = ${bookId} 인 책이 삭제되었습니다. (삭제된 수: ${affected})` };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}