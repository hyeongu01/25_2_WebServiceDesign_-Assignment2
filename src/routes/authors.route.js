const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/author.controller")

const Middleware = require("../middlewares/auth.middleware");

// 저자 생성
router.post("/", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), AuthorController.create);

// 저자들 확인
router.get('/');

// 저자 상세 확인
router.get("/:id");

// 저자 수정
router.patch("/:id");

// 저자 삭제
router.delete("/:id");

module.exports = router;

/**
 * @swagger
 * /authors:
 *  post:
 *      summary: 저자 생성 (ADMIN)
 *      tags:
 *          - Authors
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["name"]
 *                      properties:
 *                          name:
 *                              type: string
 *      responses:
 *          201:
 *              description: 생성 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateAuthorResponse"
 *          403:
 *              description: 권한 없음
 */

/**
 * @swagger
 * /authors:
 *  get:
 *      summary: 저자 목록 조회
 *      tags:
 *          - Authors
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/GetAllAuthorResponse"
 */

/**
 * @swagger
 * /authors/{id}:
 *  get:
 *      summary: 저자 상세 조회
 *      tags:
 *          - Authors
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
 *                          $ref: "#/components/schemas/CreateAuthorResponse"
 *          404:
 *              description: 저자 없음
 */

/**
 * @swagger
 * /authors/{id}:
 *  patch:
 *      summary: 저자 수정 (ADMIN)
 *      tags:
 *          - Authors
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
 *                          name:
 *                              type: string
 *      responses:
 *          200:
 *              description: 수정 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateAuthorResponse"
 *          403:
 *              description: 권한 없음
 */

/**
 * @swagger
 * /authors/{id}:
 *  delete:
 *      summary: 저자 삭제 (ADMIN)
 *      tags:
 *          - Authors
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
