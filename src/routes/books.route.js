/**
 * @openapi
 * tags:
 *   - name: Books
 *     description: Book endpoints
 */
const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.controller");

const Middleware = require("../middlewares/auth.middleware")

// 책 등록
router.post("/", Middleware.authenticate, Middleware.authenticateRole(["SELLER"]), BookController.create);

// 책 목록 조회
router.get("/", BookController.findAll);

// 책 상세 조회
router.get("/:id", BookController.detail);

// 책 수정
router.patch("/:id", Middleware.authenticate, Middleware.authenticateRole(["SELLER"]), BookController.update);

// 책 삭제
router.delete("/:id", Middleware.authenticate, Middleware.authenticateRole(["SELLER", "ADMIN"]), BookController.delete);

// books <-> categories
// 카테고리 추가
router.post("/:bookId/categories/:categoryId", Middleware.authenticate, BookController.appendCategory);

// 카테고리 삭제
router.delete("/:bookId/categories/:categoryId", Middleware.authenticate, BookController.deleteCategory);

// books <-> authors
// 저자 추가
router.post("/:bookId/authors/:authorId", Middleware.authenticate, BookController.appendAuthor);

// 저자 삭제
router.delete("/:bookId/authors/:authorId", Middleware.authenticate, BookController.deleteAuthor);

// books <-> reviews
// 도서에 리뷰 생성
router.post("/:id/reviews", Middleware.authenticate, BookController.createReview);

// 도서의 리뷰 전체 확인
router.get("/:id/reviews", BookController.findAllReviews);

module.exports = router;

/**
 * @swagger
 * /books:
 *  post:
 *      summary: 책 등록
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["title", "price", "seller_id"]
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: number
 *      responses:
 *          201:
 *              description: 책 등록 성공
 *          400:
 *              description: 입력 body 누락
 *          403:
 *              description: seller 가 아닌 유저
 */

/**
 * @swagger
 * /books:
 *  get:
 *      summary: 책 목록 조회
 *      tags:
 *          - Books
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *            description: 요청할 페이지 번호 (1-indexed)
 *            required: false
 *          - in: query
 *            name: perPage
 *            schema:
 *              type: integer
 *            description: 페이지당 아이템 개수 (최대 100)
 *            required: false
 *          - in: query
 *            name: sort
 *            schema:
 *              type: string
 *            description: 정렬 기준 (price_asc, price_desc, title_asc, title_desc, created_at_asc, created_at_desc)
 *            required: false
 *      responses:
 *          200:
 *              description: 성공 (페이징된 책 배열 반환)
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/BooksPagedResponse"
 */

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      summary: 책 상세 조회
 *      tags:
 *          - Books
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *      responses:
 *          200:
 *              description: 성공
 *          404:
 *              description: 책을 찾을 수 없음
 */

/**
 * @swagger
 * /books/{id}:
 *  patch:
 *      summary: 책 수정
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: number
 *      responses:
 *          200:
 *              description: 수정 성공
 *          401:
 *              description: 미인증
 *          403:
 *              description: 권한 없음
 *          404:
 *              description: id = {id} 인 책 찾을 수 없음
 */

/**
 * @swagger
 * /books/{id}:
 *  delete:
 *      summary: 책 삭제
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *      responses:
 *          200:
 *              description: 삭제 성공
 *          401:
 *              description: 미인증
 *          403:
 *              description: 권한 없음
 *          404:
 *              description: id = {id} 인 책 찾을 수 없음
 */

/**
 * @swagger
 * /books/{bookId}/categories/{categoryId}:
 *  post:
 *      summary: 도서에 카테고리 추가
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *          - in: path
 *            name: categoryId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 카테고리 ID
 *      responses:
 *          200:
 *              description: 추가 성공
 *          401:
 *              description: 미인증
 *          403:
 *              description: 권한 없음
 *          404:
 *              description: id = {id} 인 책 찾을 수 없음
 */

/**
 * @swagger
 * /books/{bookId}/categories/{categoryId}:
 *  delete:
 *      summary: 도서에서 카테고리 제거
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *          - in: path
 *            name: categoryId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 카테고리 ID
 *      responses:
 *          200:
 *              description: 제거 성공
 *          401:
 *              description: 미인증
 *          403:
 *              description: 권한 없음
 *          404:
 *              description: id = {id} 인 책 찾을 수 없음
 */

/**
 * @swagger
 * /books/{bookId}/authors/{authorId}:
 *  post:
 *      summary: 도서에 저자 추가
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *          - in: path
 *            name: authorId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 저자 ID
 *      responses:
 *          200:
 *              description: 추가 성공
 *          401:
 *              description: 미인증
 *          403:
 *              description: 권한 없음
 *          404:
 *              description: id = {id} 인 책 찾을 수 없음
 */

/**
 * @swagger
 * /books/{bookId}/authors/{authorId}:
 *  delete:
 *      summary: 도서에서 저자 제거
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *          - in: path
 *            name: authorId
 *            schema:
 *              type: integer
 *            required: true
 *            description: 저자 ID
 *      responses:
 *          200:
 *              description: 제거 성공
 *          401:
 *              description: 미인증
 *          403:
 *              description: 권한 없음
 *          404:
 *              description: id = {id} 인 책 찾을 수 없음
 */

/**
 * @swagger
 * /books/{id}/reviews:
 *  post:
 *      summary: 도서에 리뷰 등록
 *      tags:
 *          - Books
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["content", "rating"]
 *                      properties:
 *                          content:
 *                              type: string
 *                          rating:
 *                              type: integer
 *      responses:
 *          201:
 *              description: 등록 성공
 *          404:
 *              description: id = {id} 인 도서를 찾을 수 없습니다.
 */

/**
 * @swagger
 * /books/{id}/reviews:
 *  get:
 *      summary: 도서에 대한 모든 리뷰 조회
 *      tags:
 *          - Books
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 책 ID
 *      responses:
 *          200:
 *              description: 성공 (리뷰 배열 반환)
 */
