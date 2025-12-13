const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

// 회원가입
router.post("/signup", authController.signup);

// 로그인
router.post("/login", authController.login);

// 로그아웃
router.post("/logout", authMiddleware.authenticate, authController.logout);

// 토큰 재발급
router.post("/refresh", authController.refresh);

module.exports = router;


// 회원가입 swagger
/**
 * @swagger
 * /auth/signup:
 *  post:
 *      summary: 회원가입
 *      description: 새로운 사용자를 생성한다.
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/SignupRequest"
 *      responses:
 *          201: 
 *              description: 회원가입 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/SignupResponse"
 *          400:
 *              description: 입력 body 누락
 *          409:
 *              description: username 충돌
 */

// 회원가입 swagger
/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: 로그인
 *      description: 사용자 로그인
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/LoginRequest"
 *      responses:
 *          200: 
 *              description: 로그인 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/LoginResponse"
 *          400:
 *              description: 입력 body 누락
 *          401:
 *              description: 비밀번호 틀림
 *          404:
 *              description: 유저를 찾을 수 없음
 *          409:
 *              description: username 충돌
 */

// 로그아웃 swagger
/**
 * @swagger
 * /auth/logout:
 *  post:
 *      summary: 로그아웃
 *      description: 사용자 로그아웃 (refreshToken 비활성화)
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - refreshToken
 *                      properties:
 *                          refreshToken:
 *                              type: string
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzY1NjU1ODM4LCJleHAiOjE3NjYyNjA2Mzh9.8_96coPrIFSiQvkQFcbcAwptCVU7DUCcnGJhiKcfN1g
 *                              description: 리프레시 토큰
 *      responses:
 *          200: 
 *              description: 로그아웃 성공
 *          400:
 *              description: 입력 body 누락 (refreshToken)
 *          401:
 *              description: 리프레시 토큰 검증 실패 등
 *          404:
 *              description: 리프레시 토큰을 찾을 수 없음 (이미 로그아웃됨)
 */

// 갱신 swagger
/**
 * @swagger
 * /auth/refresh:
 *  post:
 *      summary: 리프레시 토큰 재발급
 *      description: 리프레시 토큰 재발급
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - refreshToken
 *                      properties:
 *                          refreshToken:
 *                              type: string
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzY1NjU1ODM4LCJleHAiOjE3NjYyNjA2Mzh9.8_96coPrIFSiQvkQFcbcAwptCVU7DUCcnGJhiKcfN1g
 *                              description: 리프레시 토큰
 *      responses:
 *          200: 
 *              description: 로그아웃 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              accessToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzY1NjU3NjA3LCJleHAiOjE3NjU2NjEyMDd9.LZcPiebXRu3x8JXVwas7E0f5-SFErA8fGnLMnEhHCLM
 *                              refreshToken:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzY1NjU3NjA3LCJleHAiOjE3NjYyNjI0MDd9.LnI5_8xdE-UuJxbGlJtnW83SYmOfLe3rgFRinA_642U
 *                              accessTokenExpiresAt:
 *                                  type: string
 *                                  example: 2025-12-13T21:26:47.000Z
 *          400:
 *              description: 입력 body 누락 (refreshToken)
 *          401:
 *              description: 이미 로그아웃 됨.
 *          404:
 *              description: 리프레시 토큰을 찾을 수 없음
 */