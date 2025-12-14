const BookService = require("../services/book.service")

const BadRequestError = require("../errors/BasRequest");
const NotFoundError = require("../errors/NotFound");
const UnauthorizedError = require("../errors/Unauthorized");

function sanitizeBook(book) {
	if (!book) return book;
	return (typeof book.toJSON === 'function') ? book.toJSON() : book;
}

module.exports = {
	async create(req, res) {
		try {
            const sellerId = req.user?.id

            if (!sellerId) {
                throw new UnauthorizedError("도서 등록은 SELLER 만 할 수 있습니다.")
            }

            const payload = {
                ...req.body,
                seller_id: sellerId
            };

			const book = await BookService.create(payload);
			return res.status(201).json({ data: sanitizeBook(book), meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async findAll(req, res) {
		try {
			const books = await BookService.findAll();
			return res.status(200).json({ data: books.map(sanitizeBook), meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async detail(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");

			const book = await BookService.getById(id);
			return res.status(200).json({ data: sanitizeBook(book), meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async update(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");

			const payload = req.body || {};
            const userId = req.user.id;

			const updated = await BookService.update(id, userId, payload);
			return res.status(200).json({ data: sanitizeBook(updated), meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async delete(req, res) {
		try {
			const id = Number(req.params.id);
			if (!id) throw new BadRequestError("path parameter: id 가 없습니다.");

			const message = await BookService.delete(id, req.user.id);
			return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async appendCategory(req, res) {
		try {
			const bookId = Number(req.params.bookId);
			const categoryId = Number(req.params.categoryId);
			if (!bookId || !categoryId) throw new BadRequestError("path parameters: bookId, categoryId 필요");

			const message = await BookService.appendCategory(bookId, categoryId, req.user.id);
			return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async deleteCategory(req, res) {
		try {
			const bookId = Number(req.params.bookId);
			const categoryId = Number(req.params.categoryId);
			if (!bookId || !categoryId) throw new BadRequestError("path parameters: bookId, categoryId 필요");

		    const message = await BookService.deleteCategory(bookId, categoryId, req.user.id);
			return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async appendAuthor(req, res) {
		try {
			const bookId = Number(req.params.bookId);
			const authorId = Number(req.params.authorId);
			if (!bookId || !authorId) throw new BadRequestError("path parameters: bookId, authorId 필요");

			const message = await BookService.appendAuthor(bookId, authorId, req.user.id);
			return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async deleteAuthor(req, res) {
		try {
			const bookId = Number(req.params.bookId);
			const authorId = Number(req.params.authorId);
			if (!bookId || !authorId) throw new BadRequestError("path parameters: bookId, authorId 필요");

			const message = await BookService.deleteAuthor(bookId, authorId, req.user.id);
			return res.status(200).json({ data: message, meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async createReview(req, res) {
		try {
			const bookId = Number(req.params.id);
			const userId = Number(req.user?.id);
			const { content, rating } = req.body || {};

			if (!bookId) throw new BadRequestError("path parameter: id 가 없습니다.");
			if (!userId) throw new BadRequestError("로그인 된 사용자가 필요합니다.");

			const review = await BookService.createReview(bookId, userId, content, rating);
			return res.status(201).json({ data: review, meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	},

	async findAllReviews(req, res) {
		try {
			const bookId = Number(req.params.id);
			if (!bookId) throw new BadRequestError("path parameter: id 가 없습니다.");

			const reviews = await BookService.findAllReviews(bookId);
			return res.status(200).json({ data: reviews, meta: { timestamp: new Date() } });
		} catch (err) {
			return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
		}
	}
}