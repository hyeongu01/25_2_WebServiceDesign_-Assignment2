const CategoryService = require("../services/category.service");

const BadRequestError = require("../errors/BasRequest");
const NotFoundError = require("../errors/NotFound");

module.exports = {
    async create(req, res) {
        try {
            const { name } = req.body;
            if (!name) throw new BadRequestError("name은 필수입니다.");

            const category = await CategoryService.create({ name });
            return res.status(201).json({ data: category, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async findAll(req, res) {
        try {
            const categories = await CategoryService.findAll();
            return res.status(200).json({ data: categories, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async findOneById(req, res) {
        try {
            const id = Number(req.params.id);
            if (!id) throw new BadRequestError("path parameter: id 는 숫자입니다.");

            const category = await CategoryService.findOneById(id);
            if (!category) throw new NotFoundError(`id = ${id} 인 카테고리가 없습니다.`);

            return res.status(200).json({ data: category, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (!id) throw new BadRequestError("path parameter: id 가 없거나 형식이 틀립니다.");

            const data = await CategoryService.delete(id);
            return res.status(200).json({ data, meta: { timestamp: new Date() } });
        } catch (err) {
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }
}