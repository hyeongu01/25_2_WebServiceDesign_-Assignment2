const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller")

// 회원가입
router.post("/signup", authController.signup);

// 로그인
router.post("/login", authController.login);

// 로그아웃
router.post("/logout", (req, res) => {
    res.send("logout page");
});

// 토큰 재발급
router.post("/refresh", (req, res) => {
    res.send("refresh page")
});

module.exports = router;