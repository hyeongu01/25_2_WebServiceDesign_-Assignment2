const express = require("express");
const router = express.Router();

// 카테고리 추가
router.post("/");

// 카테고리 전부 읽기
router.get("/");

// 카테고리 상세 보기
router.get("/:id");

// 카테고리 삭제
router.delete("/:id");

module.exports = router;

/**
 * @swagger
 * /categories:
 *  post:
 *      summary: 카테고리 생성 (ADMIN)
 *      tags:
 *          - Categories
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                      properties:
 *                          name:
 *                              type: string
 *      responses:
 *          201:
 *              description: 생성 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateCategoryResponse"
 *          403:
 *              description: 권한 없음
 */

/**
 * @swagger
 * /categories:
 *  get:
 *      summary: 카테고리 목록 조회
 *      tags:
 *          - Categories
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/GetAllCategoriesResponse"
 */

/**
 * @swagger
 * /categories/{id}:
 *  get:
 *      summary: 카테고리 상세 조회
 *      tags:
 *          - Categories
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
 *                          $ref: "#/components/schemas/CreateCategoryResponse"
 *          404:
 *              description: 카테고리 없음
 */

/**
 * @swagger
 * /categories/{id}:
 *  delete:
 *      summary: 카테고리 삭제 (ADMIN)
 *      tags:
 *          - Categories
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
 *          403:
 *              description: 권한 없음
 */