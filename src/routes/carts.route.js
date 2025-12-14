const express = require("express");
const router = express.Router();

const Middleware = require("../middlewares/auth.middleware");
const CartController = require("../controllers/cart.controller");

// 카트 읽기
router.get("/", Middleware.authenticate, CartController.findAll);

// 카트 항목 추가
router.post("/items", Middleware.authenticate, CartController.append);

// 카트 항목 변경 (수량, 체크 여부)
router.patch("/items/:bookId", Middleware.authenticate, CartController.update);

// 카트 항목 삭제
router.delete("/items/:bookId", Middleware.authenticate, CartController.delete);

module.exports = router

/**
 * @swagger
 * /carts:
 *  get:
 *      summary: 장바구니 조회
 *      tags:
 *          - Carts
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 성공
 *          401:
 *              description: 인증 필요
 *          404:
 *              description: 카트가 존재하지 않음
 */

/**
 * @swagger
 * /carts/items:
 *  post:
 *      summary: 장바구니 항목 추가
 *      tags:
 *          - Carts
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["bookId", "quantity"]
 *                      properties:
 *                          bookId:
 *                              type: integer
 *                          quantity:
 *                              type: integer
 *      responses:
 *          201:
 *              description: 추가 성공
 *          400:
 *              description: 입력 body 누락 또는 유효성 오류
 *          401:
 *              description: 인증 필요
 *          404:
 *              description: 책을 찾을 수 없음
 */

/**
 * @swagger
 * /carts/items/{bookId}:
 *  patch:
 *      summary: 장바구니 항목 변경
 *      tags:
 *          - Carts
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          quantity:
 *                              type: integer
 *      responses:
 *          200:
 *              description: 변경 성공
 *          400:
 *              description: 입력 body 오류
 *          401:
 *              description: 인증 필요
 *          404:
 *              description: cart 에 해당 항목이 없음
 */

/**
 * @swagger
 * /carts/items/{bookId}:
 *  delete:
 *      summary: 장바구니 항목 삭제
 *      tags:
 *          - Carts
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 삭제 성공
 *          400:
 *              description: 입력 오류
 *          401:
 *              description: 인증 필요
 *          404:
 *              description: cart 에 해당 항목이 없음
 */


