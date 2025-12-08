const express = require("express");
const router = express.Router();

// 회원가입
router.post("/signup");

// 로그인
router.post("/login");

// 로그아웃
router.post("/logout");

// 토큰 재발급
router.post("/refresh");

module.exports = router;