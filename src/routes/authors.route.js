const express = require("express");
const router = express.Router();

// 저자 생성
router.post("/");

// 저자들 확인
router.get('/');

//저자 상세 확인
router.get("/:id");

// 저자 수정
router.patch("/:id");

// 저자 삭제
router.delete("/:id");

module.exports = router;