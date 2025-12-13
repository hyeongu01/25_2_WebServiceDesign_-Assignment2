/**
 * @openapi
 * tags:
 *   - name: Books
 *     description: Book endpoints
 */
const express = require("express");
const router = express.Router();
const BookController = require("../controllers/user.controller");

// 책 등록
router.post("/");

// 책 목록 조회
router.get("/");

// 책 상세 조회
router.get("/:id");

// 책 수정
router.patch("/:id");

// 책 삭제
router.delete("/:id");

// books <-> categories
// 카테고리 추가
router.post("/:bookId/categories/:categoryId");

// 카테고리 삭제
router.delete("/:bookId/categories/:categoryId");

// books <-> authors
// 저자 추가
router.post("/:bookId/authors/:authorId");

// 저자 삭제
router.delete("/:bookId/authors/:authorId");

// books <-> reviews
// 도서에 리뷰 생성
router.post("/:id/reviews");

// 도서의 리뷰 전체 확인
router.get("/:id/reviews");

module.exports = router;

/**
 * @swagger
 * /books:
 *  post:
 *      summary: 책 등록
 *      tags:
 *          - Books
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
 *                          seller_id:
 *                              type: integer
 *      responses:
 *          201:
 *              description: 책 등록 성공
 *          400:
 *              description: 입력 body 누락
 */

/**
 * @swagger
 * /books:
 *  get:
 *      summary: 책 목록 조회
 *      tags:
 *          - Books
 *      responses:
 *          200:
 *              description: 성공 (책 배열 반환)
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
 */

/**
 * @swagger
 * /books/{id}:
 *  delete:
 *      summary: 책 삭제
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
 *              description: 삭제 성공
 */

/**
 * @swagger
 * /books/{bookId}/categories/{categoryId}:
 *  post:
 *      summary: 도서에 카테고리 추가
 *      tags:
 *          - Books
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
 */

/**
 * @swagger
 * /books/{bookId}/categories/{categoryId}:
 *  delete:
 *      summary: 도서에서 카테고리 제거
 *      tags:
 *          - Books
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
 */

/**
 * @swagger
 * /books/{bookId}/authors/{authorId}:
 *  post:
 *      summary: 도서에 저자 추가
 *      tags:
 *          - Books
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
 */

/**
 * @swagger
 * /books/{bookId}/authors/{authorId}:
 *  delete:
 *      summary: 도서에서 저자 제거
 *      tags:
 *          - Books
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
 */

/**
 * @swagger
 * /books/{id}/reviews:
 *  post:
 *      summary: 도서에 리뷰 등록
 *      tags:
 *          - Books
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
