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
router.post("/refresh", authMiddleware.authenticate, authController.refresh);

module.exports = router;