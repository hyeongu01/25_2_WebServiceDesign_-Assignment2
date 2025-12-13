/**
 * @openapi
 * tags:
 *   - name: Orders
 *     description: Order endpoints
 */
const express = require("express");
const router = express.Router();

// 주문 생성
router.post("/");

// 주문 읽어오기
router.get("/");

// 주문 상세 보기
router.get("/:id");

// 주문 수정
router.patch("/:id");

// 주문 상태 변경
router.patch("/:id/status");

// 주문 삭제
router.delete("/:id");

module.exports = router;

/**
 * @swagger
 * /orders:
 *  post:
 *      summary: 주문 생성
 *      tags:
 *          - Orders
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["items"]
 *                      properties:
 *                          items:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      bookId:
 *                                          type: integer
 *                                      quantity:
 *                                          type: integer
 *      responses:
 *          201:
 *              description: 주문 생성 성공
 */

/**
 * @swagger
 * /orders:
 *  get:
 *      summary: 주문 목록 조회
 *      tags:
 *          - Orders
 *      responses:
 *          200:
 *              description: 성공
 */

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *      summary: 주문 상세 조회
 *      tags:
 *          - Orders
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
 *              description: 주문 없음
 */

/**
 * @swagger
 * /orders/{id}:
 *  patch:
 *      summary: 주문 수정
 *      tags:
 *          - Orders
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
 *                          status:
 *                              type: string
 *      responses:
 *          200:
 *              description: 수정 성공
 */

/**
 * @swagger
 * /orders/{id}/status:
 *  patch:
 *      summary: 주문 상태 변경
 *      tags:
 *          - Orders
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
 *                      required: ["status"]
 *                      properties:
 *                          status:
 *                              type: string
 *      responses:
 *          200:
 *              description: 상태 변경 성공
 */

/**
 * @swagger
 * /orders/{id}:
 *  delete:
 *      summary: 주문 삭제
 *      tags:
 *          - Orders
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
