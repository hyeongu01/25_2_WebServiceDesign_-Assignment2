const OrderService = require("../services/order.service");

const BadRequestError = require("../errors/BasRequest");

function sanitize(order) {
    if (!order) return order;
    return typeof order.toJSON === 'function' ? order.toJSON() : order;
}

module.exports = {
    async create(req, res) {
        try {
            const userId = Number(req.user?.id);
            const items = req.body?.items;

            if (!userId) throw new BadRequestError("로그인 된 사용자가 필요합니다.");

            const order = await OrderService.create(userId, items);
            return res.status(201).json({ data: sanitize(order), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async findAll(req, res) {
        try {
            const userId = Number(req.user?.id);
            const role = req.user?.role;

            const orders = await OrderService.findAll(userId, role);
            return res.status(200).json({ data: (orders || []).map(sanitize), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async detail(req, res) {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.user?.id);
            const role = req.user?.role;

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");

            const order = await OrderService.getById(id, userId, role);
            return res.status(200).json({ data: sanitize(order), meta: { timestamp: new Date() } });
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

            const updated = await OrderService.update(id, userId, payload);
            return res.status(200).json({ data: sanitize(updated), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async changeStatus(req, res) {
        try {
            const id = Number(req.params.id);
            const role = req.user?.role;
            const status = req.body?.status;

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");
            if (!status) throw new BadRequestError("body: status 가 필요합니다.");

            const updated = await OrderService.changeStatus(id, role, status);
            return res.status(200).json({ data: sanitize(updated), meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const userId = Number(req.user?.id);
            const role = req.user?.role;

            if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");

            const message = await OrderService.delete(id, userId, role);
            return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }
}
