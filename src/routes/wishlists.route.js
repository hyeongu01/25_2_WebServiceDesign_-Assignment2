/**
 * @openapi
 * tags:
 *   - name: Wishlists
 *     description: Wishlist endpoints
 */
const express = require("express");
const router = express.Router();

// 위시리스트 읽기
router.get("/");

// 위시리스트에 아이템 추가
router.post("/items");

// 위시리스트 아이템 삭제
router.delete("/items/:bookId");

module.exports = router;

/**
 * @swagger
 * /wishlists:
 *  get:
 *      summary: 위시리스트 조회
 *      tags:
 *          - Wishlists
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
 */

/**
 * @swagger
 * /wishlists/items/{bookId}:
 *  delete:
 *      summary: 위시리스트 아이템 삭제
 *      tags:
 *          - Wishlists
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: 삭제 성공
 */

