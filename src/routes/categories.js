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