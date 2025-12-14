const express = require("express");
const { route } = require("./users.route");
const router = express.Router();

// 리뷰 생성: -> books.route.js
// router.post("/books/:id/reviews");

// 도서 리뷰 확인: -> books.route.js
// router.get("/books/:id/reviews");

// 리뷰 상세 확인
router.get("/:id");

// 리뷰 수정
router.patch("/:id");

// 리뷰 삭제
router.delete("/:id");

// review like
// 리뷰 좋아요 추가
router.post("/:id/like");

// 리뷰 좋아요 확인
router.get("/:id/like");

// 리뷰 좋아요 삭제
router.delete("/:id/like");

module.exports = router;

/**
 * @swagger
 * /reviews/{id}:
 *  get:
 *      summary: 리뷰 상세 조회
 *      tags:
 *          - Reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 성공
 *          404:
 *              description: 리뷰를 찾을 수 없음
 */

/**
 * @swagger
 * /reviews/{id}:
 *  patch:
 *      summary: 리뷰 수정
 *      tags:
 *          - Reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          content:
 *                              type: string
 *                          rating:
 *                              type: integer
 *      responses:
 *          200:
 *              description: 수정 성공
 */

/**
 * @swagger
 * /reviews/{id}:
 *  delete:
 *      summary: 리뷰 삭제
 *      tags:
 *          - Reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 삭제 성공
 */

/**
 * @swagger
 * /reviews/{id}/like:
 *  post:
 *      summary: 리뷰 좋아요 추가
 *      tags:
 *          - Reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 좋아요 추가 성공
 */

/**
 * @swagger
 * /reviews/{id}/like:
 *  get:
 *      summary: 리뷰 좋아요 확인
 *      tags:
 *          - Reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 좋아요 상태 반환
 */

/**
 * @swagger
 * /reviews/{id}/like:
 *  delete:
 *      summary: 리뷰 좋아요 취소
 *      tags:
 *          - Reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 좋아요 취소 성공
 */
