const express = require("express");
const router = express.Router();

const Middleware = require('../middlewares/auth.middleware');
const WishlistController = require("../controllers/wishlist.controller")

// 위시리스트 읽기
router.get("/", Middleware.authenticate, WishlistController.findAll);

// 위시리스트에 아이템 추가
router.post("/items", Middleware.authenticate, WishlistController.append);

// 위시리스트 아이템 삭제
router.delete("/items/:bookId", Middleware.authenticate, WishlistController.delete);







module.exports = router;

/**
 * @swagger
 * /wishlists:
 *  get:
 *      summary: 위시리스트 조회
 *      tags:
 *          - Wishlists
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 성공
 */

/**
 * @swagger
 * /wishlists/items:
 *  post:
 *      summary: 위시리스트에 아이템 추가
 *      tags:
 *          - Wishlists
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["bookId"]
 *                      properties:
 *                          bookId:
 *                              type: integer
 *      responses:
 *          201:
 *              description: 추가 성공
 *          400:
 *              description: 파라메터 오류
 */

/**
 * @swagger
 * /wishlists/items/{bookId}:
 *  delete:
 *      summary: 위시리스트 아이템 삭제
 *      tags:
 *          - Wishlists
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
 *          404:
 *              description: id = {bookId} 인 책이 위시리스트에 없습니다.
 */

