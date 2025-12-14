const CategoryRepository = require("../repositories/category.repository");
const sequelize = require("../config/sequelize");

const NotFoundError = require("../errors/NotFound");
const BadRequestError = require("../errors/BasRequest");

module.exports = {
    async create(data) {
        if (!data || !data.name) {
            throw new BadRequestError("name 은 필수입니다.");
        }

        const category = await CategoryRepository.create({ name: data.name });
        return category;
    },

    async findAll() {
        const categories = await CategoryRepository.findAll();
        return categories;
    },

    async findOneById(id) {
        const category = await CategoryRepository.findOneById(id);
        return category;
    },

    async delete(id) {
        const transaction = await sequelize.transaction();
        try {
            const category = await CategoryRepository.findOneById(id, transaction);
            if (!category) throw new NotFoundError(`id = ${id} 인 카테고리가 없습니다.`);

            const affected = await CategoryRepository.delete(id, transaction);
            if (affected === 0) throw new NotFoundError(`id = ${id} 인 카테고리가 없습니다.`);

            await transaction.commit();
            return { message: `삭제가 성공적으로 이루어졌습니다. (삭제된 수: ${affected})` };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}