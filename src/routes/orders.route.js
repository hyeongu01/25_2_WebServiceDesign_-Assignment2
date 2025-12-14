const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

// 주문 생성
router.post("/", auth.authenticate, OrderController.create);

// 주문 읽어오기
router.get("/", auth.authenticate, OrderController.findAll);

// 주문 상세 보기
router.get("/:id", auth.authenticate, OrderController.detail);

// 주문 수정 (예: 사용자에 의한 취소)
router.patch("/:id", auth.authenticate, OrderController.update);

// 주문 상태 변경 (관리자 전용)
router.patch("/:id/status", auth.authenticate, OrderController.changeStatus);

// 주문 삭제
router.delete("/:id", auth.authenticate, OrderController.delete);

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
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201:
 *              description: 주문 생성 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/OrderResponse"
 *          400:
 *              description: 요청 오류
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
 *          401:
 *              description: 인증 필요
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /orders:
 *  get:
 *      summary: 주문 목록 조회
 *      tags:
 *          - Orders
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/OrdersResponse"
 *          401:
 *              description: 인증 필요
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
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
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/OrderResponse"
 *          401:
 *              description: 인증 필요
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
 *          404:
 *              description: 주문 없음
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
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
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 수정 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/OrderResponse"
 *          401:
 *              description: 인증 필요
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
 *          403:
 *              description: 권한 없음
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
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
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 상태 변경 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/OrderResponse"
 *          401:
 *              description: 인증 필요
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
 *          403:
 *              description: 권한 없음
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
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
 *      security:
 *          - bearerAuth: []
	 responses:
 *          200:
 *              description: 삭제 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/StandardResponse"
 *          401:
 *              description: 인증 필요
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
 *          403:
 *              description: 권한 없음
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ErrorResponse"
 */
