const AuthorRepository = require("../repositories/author.repository");


const sequelize = require("../config/sequelize");
const NotFoundError = require("../errors/NotFound");

module.exports = {
    async create(data) {
        const author = await AuthorRepository.create(data);

        return author;
    },

    async findAll() {
        const authors = await AuthorRepository.findAll();

        return authors
    },

    async findOneById(id) {
        const author = await AuthorRepository.findOneById(id);

        return author
    },

    async update(id, newData) {
        const transaction = await sequelize.transaction();

        try {
            // id 탐색
            const author = await AuthorRepository.findOneById(id, transaction);
            if (!author) {
                throw new NotFoundError(`id = ${id} 인 저자가 없습니다.`);
            }

            // 저자 업데이트
            const [affected] = await AuthorRepository.update(id, newData, transaction);

            if (affected === 0) {
                throw new NotFoundError(`id = ${id} 인 저자가 없습니다.`);
            }

            await transaction.commit();
            return await AuthorRepository.findOneById(id);
        } catch(err) {
            await transaction.rollback();
            throw err
        }
    },

    async delete(id) {
        const transaction = await sequelize.transaction();

        try {
            // id 확인
            const author = await AuthorRepository.findOneById(id, transaction);

            if (!author) {
                throw new NotFoundError(`id = ${id} 인 저자가 없습니다.`)
            }

            const affected = await AuthorRepository.delete(id);
            if (affected === 0) {
                throw new NotFoundError(`id = ${id} 인 저자가 없습니다.`);
            }

            await transaction.commit()
            return {
                message: `삭제가 성공적으로 이루어졌습니다. (삭제된 수: ${affected})`
            }
        } catch(err) {
            await transaction.rollback()
            throw err;
        }
        
    }
}

