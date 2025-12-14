const AuthorService = require("../services/author.service")

// 에러 코드들
const BadRequestError = require("../errors/BasRequest");
const NotFoundError = require("../errors/NotFound");

module.exports = {
    async create(req, res) {
        try {
            // 입력 검증
            let {name, birth} = req.body;
            birth = new Date(birth);

            if (!name) {
                throw new BadRequestError("저자 이름은 필수입니다.");
            }

            if (!birth) {
                throw new BadRequestError("birth 형식은 YYYY-MM-dd 입니다.")
            }
            // 연산
            const author = await AuthorService.create({name, birth});

            return res.status(201).json({
                data: author,
                meta: {
                    timestamp: new Date()
                }
            })
        } catch (err) {
            // if service threw a known error, forward it; otherwise wrap
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async findAll(req, res) {
        try {
            const authors = await AuthorService.findAll();

            return res.status(200).json({
                data: authors,
                meta: {
                    timestamp: new Date()
                }
            })
        } catch (err) {
            // if service threw a known error, forward it; otherwise wrap
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async findOneById(req, res) {
        try {
            // input validation
            const id = Number(req.params.id);

            if (!id) {
                throw new BadRequestError("path parameter: id 는 숫자입니다.")
            }

            // processing
            const author = await AuthorService.findOneById(id);
            if (!author) {
                throw new NotFoundError(`id = ${id} 인 저자가 없습니다.`)
            }

            return res.status(200).json({
                data: author,
                meta: {
                    timestamp: new Date()
                }
            })
        } catch (err) {
            // if service threw a known error, forward it; otherwise wrap
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async update(req, res) {
        try {
            const id = Number(req.params.id)
            const payload = req.body

            if (!id) {
                throw new BadRequestError("path parameter: id 가 없거나 형식이 틀립니다.")
            }

            if (!payload) {
                throw new BadRequestError("body 가 비었습니다.")
            }

            // processing
            const updatedAuthor = await AuthorService.update(id, payload)
            return res.status(200).json({
                data: updatedAuthor,
                meta: {
                    timestamp: new Date()
                }
            })

        } catch (err) {
            // if service threw a known error, forward it; otherwise wrap
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    },

    async delete(req, res) {
        try {
            const id = Number(req.params.id)

            if (!id) {
                throw new BadRequestError("path parameter: id 가 없거나 형식이 틀립니다.")
            }

            // processing
            const data = await AuthorService.delete(id)
            return res.status(200).json({
                data: data,
                meta: {
                    timestamp: new Date()
                }
            })

        } catch (err) {
            // if service threw a known error, forward it; otherwise wrap
            return res.status(err.statusCode || 500).json(err.response ? err.response() : { message: err.message });
        }
    }

}