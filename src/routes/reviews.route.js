const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/review.controller");
const Middleware = require("../middlewares/auth.middleware");

// 리뷰 상세 확인
router.get("/:id", ReviewController.detail);

// 리뷰 수정
router.patch("/:id", Middleware.authenticate, ReviewController.update);

// 리뷰 삭제
router.delete("/:id", Middleware.authenticate, ReviewController.delete);

// review like
// 리뷰 좋아요 추가
router.post("/:id/like", Middleware.authenticate, ReviewController.like);

// 리뷰 좋아요 확인
router.get("/:id/like", Middleware.authenticate, ReviewController.likeStatus);

// 리뷰 좋아요 삭제
router.delete("/:id/like", Middleware.authenticate, ReviewController.unlike);

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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ReviewResponse"
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
 *      security:
 *          - bearerAuth: []
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ReviewResponse"
 */

/**
 * @swagger
 * /reviews/{id}:
 *  delete:
 *      summary: 리뷰 삭제
 *      tags:
 *          - Reviews
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 삭제 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/StandardResponse"
 */

/**
 * @swagger
 * /reviews/{id}/like:
 *  post:
 *      summary: 리뷰 좋아요 추가
 *      tags:
 *          - Reviews
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 좋아요 추가 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/StandardResponse"
 */

/**
 * @swagger
 * /reviews/{id}/like:
 *  get:
 *      summary: 리뷰 좋아요 확인
 *      tags:
 *          - Reviews
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 좋아요 상태 반환
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ReviewLikeStatusResponse"
 */

/**
 * @swagger
 * /reviews/{id}/like:
 *  delete:
 *      summary: 리뷰 좋아요 취소
 *      tags:
 *          - Reviews
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 좋아요 취소 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/StandardResponse"
 */
