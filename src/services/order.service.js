const sequelize = require("../config/sequelize");
const OrderRepository = require("../repositories/order.repository");
const OrderItemRepository = require("../repositories/orderItem.repository");
const BookRepository = require("../repositories/book.repository");

const NotFoundError = require("../errors/NotFound");
const BadRequestError = require("../errors/BasRequest");
const ForbiddenError = require("../errors/Forbidden");

module.exports = {
    /**
     * Create an order for a user with items: [{ bookId, quantity }]
     */
    async create(userId, items = []) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new BadRequestError("items 배열이 필요합니다.");
        }

        const transaction = await sequelize.transaction();
        try {
            // load books and compute total
            let total = 0;
            const details = [];

            for (const it of items) {
                const bookId = Number(it.bookId);
                const qty = Number(it.quantity || 0);
                if (!bookId || qty <= 0) throw new BadRequestError("item에 유효한 bookId와 quantity가 필요합니다.");

                const book = await BookRepository.findOneById(bookId, {}, transaction);
                if (!book) throw new NotFoundError(`book id ${bookId} 을(를) 찾을 수 없습니다.`);

                const price = book.price || 0;
                total += price * qty;
                details.push({ book, qty, price });
            }

            const order = await OrderRepository.create({ user_id: userId, total_price: total }, transaction);

            // create order items
            for (const d of details) {
                await OrderItemRepository.create({ order_id: order.id, book_id: d.book.id, quantity: d.qty, price_at_order: d.price }, transaction);
            }

            await transaction.commit();

            // return order with items
            const created = await OrderRepository.findOneById(order.id, { include: [{ model: require("../models").Order_Item, include: [{ model: require("../models").Book }] }] });
            return created;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async findAll(userId, userRole) {
        const include = [{ model: require("../models").Order_Item, include: [{ model: require("../models").Book }] }];
        if (userRole === "ADMIN") {
            return OrderRepository.findAll({ include });
        }
        return OrderRepository.findAllByUserId(userId, { include });
    },

    async getById(id, userId, userRole) {
        const order = await OrderRepository.findOneById(id, { include: [{ model: require("../models").Order_Item, include: [{ model: require("../models").Book }] }] });
        if (!order) throw new NotFoundError("주문을 찾을 수 없습니다.");

        if (userRole !== "ADMIN" && order.user_id !== userId) {
            throw new ForbiddenError("권한이 없습니다.");
        }
        return order;
    },

    async update(id, userId, payload) {
        // allow order owner to cancel their pending order (status -> CANCELED)
        const transaction = await sequelize.transaction();
        try {
            const order = await OrderRepository.findOneById(id, {}, transaction);
            if (!order) throw new NotFoundError("주문을 찾을 수 없습니다.");

            if (order.user_id !== userId) throw new ForbiddenError("권한이 없습니다.");

            // Only allow setting to CANCELED by owner
            if (payload.status && payload.status !== "CANCELED") {
                throw new ForbiddenError("사용자는 해당 상태로 변경할 수 없습니다.");
            }

            await OrderRepository.update(id, payload, transaction);
            const updated = await OrderRepository.findOneById(id, {}, transaction);
            await transaction.commit();
            return updated;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async changeStatus(id, userRole, newStatus) {
        // Only admin can change status via /:id/status
        if (userRole !== "ADMIN") throw new ForbiddenError("권한이 없습니다.");

        const transaction = await sequelize.transaction();
        try {
            const order = await OrderRepository.findOneById(id, {}, transaction);
            if (!order) throw new NotFoundError("주문을 찾을 수 없습니다.");

            await OrderRepository.update(id, { status: newStatus }, transaction);
            const updated = await OrderRepository.findOneById(id, {}, transaction);
            await transaction.commit();
            return updated;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    async delete(id, userId, userRole) {
        const transaction = await sequelize.transaction();
        try {
            const order = await OrderRepository.findOneById(id, {}, transaction);
            if (!order) throw new NotFoundError("주문을 찾을 수 없습니다.");

            if (userRole !== "ADMIN" && order.user_id !== userId) throw new ForbiddenError("권한이 없습니다.");

            await OrderRepository.delete(id, transaction);
            await transaction.commit();
            return { message: "삭제 성공" };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
