

const sequelize = require("../config/sequelize");
const BookRepository = require("../repositories/book.repository");
const BookCategoryRepository = require("../repositories/bookCategory.repository");
const BookAuthorRepository = require("../repositories/bookAuthor.repository");
const ReviewRepository = require("../repositories/review.repository");

const NotFoundError = require("../errors/NotFound");
const BadRequestError = require("../errors/BasRequest");
const ForbiddenError = require("../errors/Forbidden");
const UnauthorizedError = require("../errors/Unauthorized");

module.exports = {
	async create(bookData) {
		if (!bookData.title || !bookData.price || !bookData.seller_id) {
			throw new BadRequestError("title, price, seller_id 가 필요합니다.");
		}

		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.create(bookData, transaction);
			await transaction.commit();
			return book;
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async findAll() {
		const books = await BookRepository.findAll();
		return books;
	},

	async getById(id) {
		const book = await BookRepository.findOneById(id);
		if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");
		return book;
	},

	async update(id, userId, newData) {
		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.findOneById(id, {}, transaction);
			if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

            if (book.seller_id !== userId) {
                throw new ForbiddenError("권한이 없습니다.")
            }

			await BookRepository.update(id, newData, transaction);

            const updatedBook = await BookRepository.findOneById(id, {}, transaction);
			await transaction.commit();
			return updatedBook
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async delete(id, userId) {
		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.findOneById(id, {}, transaction);
			if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

            if (userId !== book.seller_id) {
                throw new ForbiddenError("권한이 없습니다. (소유자가 아님)");
            }
            await BookRepository.delete(id, transaction);

			await transaction.commit();
			return {
                message: "삭제 성공"
            };
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async appendCategory(bookId, categoryId, userId) {
		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.findOneById(bookId, {}, transaction);
			if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

			if (userId !== book.seller_id) {
				throw new ForbiddenError("권한이 없습니다. (소유자가 아님)");
			}

			await BookCategoryRepository.create({ book_id: bookId, category_id: categoryId }, transaction);
			await transaction.commit();
			return {
                message: "카테고리 추가 완료"
            };
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async deleteCategory(bookId, categoryId, userId) {
		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.findOneById(bookId, {}, transaction);
			if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

			if (book.seller_id !== userId) {
				throw new ForbiddenError("권한이 없습니다. (소유자가 아님)");
			}

			await BookCategoryRepository.delete({ book_id: bookId, category_id: categoryId }, transaction);
			await transaction.commit();
			return {
                message: "카테고리 삭제 완료"
            };
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async appendAuthor(bookId, authorId, userId) {
		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.findOneById(bookId, {}, transaction);
			if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

			if (book.seller_id !== userId) {
				throw new ForbiddenError("권한이 없습니다.");
			}

			await BookAuthorRepository.create({ book_id: bookId, author_id: authorId }, transaction);
			await transaction.commit();
			return {
                message: "저자 추가 완료"
            };
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async deleteAuthor(bookId, authorId, userId) {
		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.findOneById(bookId, {}, transaction);
			if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

			if (book.seller_id !== userId) {
				throw new ForbiddenError("권한이 없습니다.");
			}

			await BookAuthorRepository.delete({ book_id: bookId, author_id: authorId }, transaction);
			await transaction.commit();
			return {
                message: "저자 삭제 완료"
            };
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async createReview(bookId, userId, content, rating) {
		if (!content || typeof rating !== 'number') {
			throw new BadRequestError("content 및 rating 이 필요합니다.");
		}

		const transaction = await sequelize.transaction();
		try {
			const book = await BookRepository.findOneById(bookId, {}, transaction);
			if (!book) throw new NotFoundError("책을 찾을 수 없습니다.");

			const review = await ReviewRepository.create({ book_id: bookId, user_id: userId, content, rating }, transaction);
			await transaction.commit();
			return review;
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async findAllReviews(bookId) {
		const reviews = await ReviewRepository.findAllByBookId(bookId);
		return reviews;
	}
}