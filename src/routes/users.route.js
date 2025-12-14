const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

// 미들웨어
const Middleware = require("../middlewares/auth.middleware");

// 조회
// 내 정보 조회
router.get("/me", Middleware.authenticate, UserController.getMyUser)

// 유저 전체 조회
router.get("/", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.getAllUsers);

// 유저 상세 조회
router.get("/:id", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.getUserById);

// 수정
router.patch("/:id", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.updateUser);
router.patch("/me", Middleware.authenticate, UserController.updateMyUser);
router.patch("/me/password", Middleware.authenticate, UserController.changeMyPassword);

// 삭제
router.delete("/me", Middleware.authenticate, UserController.deleteMyUser);

router.delete("/:id", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.deleteUser)

router.patch("/:id/restore", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.restoreUser)


module.exports = router;
// Swagger: Users endpoints
/**
 * @swagger
 * /users/me:
 *  get:
 *      summary: 내 정보 조회
 *      description: 로그인된 사용자 자신의 프로필을 조회합니다.
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 성공 (사용자 정보 반환)
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/SignupResponse"
 *          401:
 *              description: 로그인되어 있지 않음
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: 유저 전체 조회 (관리자 권한 필요)
 *      description: 모든 사용자를 조회합니다. ADMIN 권한 필요.
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: 성공 (사용자 배열 반환)
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UsersResponse"
 *          403:
 *              description: 권한 없음

 */

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: 유저 상세 조회 (관리자 권한 필요)
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 유저 ID
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/SignupResponse"
 *          404:
 *              description: 유저를 찾을 수 없음
 *          403:
 *              description: 권한 없음
 */

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *      summary: 유저 수정 (관리자 권한 필요)
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 유저 ID
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/SignupResponse"
 *              
 *          403:
 *              description: 권한 없음
 */

/**
 * @swagger
 * /users/me:
 *  patch:
 *      summary: 내 정보 수정
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
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
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/SignupResponse"
 *                          
 *          401:
 *              description: 로그인 필요
 */

/**
 * @swagger
 * /users/me/password:
 *  patch:
 *      summary: 내 비밀번호 변경
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: ["oldPassword", "newPassword"]
 *                      properties:
 *                          oldPassword:
 *                              type: string
 *                          newPassword:
 *                              type: string
 *      responses:
 *          204:
 *              description: 성공
 *          400:
 *              description: oldPassword 혹은 newPassword 가 없습니다.
 *          401:
 *              description: 기존 비밀번호 불일치 또는 로그인 필요
 */

/**
 * @swagger
 * /users/me:
 *  delete:
 *      summary: 내 계정 삭제
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              description: 성공
 *          401:
 *              description: 로그인 필요
 */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: 유저 삭제 (관리자 권한 필요)
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 유저 ID
 *      responses:
 *          204:
 *              description: 성공
 *          403:
 *              description: 권한 없음
 */

/**
 * @swagger
 * /users/{id}/restore:
 *  patch:
 *      summary: 유저 복구 (관리자 권한 필요)
 *      tags:
 *          - Users
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: 유저 ID
 *      responses:
 *          204:
 *              description: 성공
 *          404:
 *              description: 유저를 찾을 수 없음
 */


