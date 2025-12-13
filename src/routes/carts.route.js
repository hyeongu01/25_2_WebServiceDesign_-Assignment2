/**
 * @openapi
 * tags:
 *   - name: Carts
 *     description: Cart endpoints
 */
const express = require("express");
const router = express.Router();

// 카트 읽기
router.get("/");

// 카트 항목 추가
router.post("/items");

// 카트 항목 변경 (수량, 체크 여부)
router.patch("/items/:bookId");

// 카트 항목 삭제
router.delete("/items/:bookId");
/**
 * @swagger
 * /carts:
 *  get:
 *      summary: 장바구니 조회
 *      tags:
 *          - Carts
 *      responses:
 *          200:
 *              description: 성공
 */

/**
 * @swagger
 * /carts/items:
 *  post:
 *      summary: 장바구니 항목 추가
 *      tags:
 *          - Carts
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
 */

/**
 * @swagger
 * /carts/items/{bookId}:
 *  patch:
 *      summary: 장바구니 항목 변경
 *      tags:
 *          - Carts
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
 */

/**
 * @swagger
 * /carts/items/{bookId}:
 *  delete:
 *      summary: 장바구니 항목 삭제
 *      tags:
 *          - Carts
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


