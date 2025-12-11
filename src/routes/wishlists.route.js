const express = require("express");
const router = express.Router();

// 위시리스트 읽기
router.get("/");

// 위시리스트에 아이템 추가
router.post("/items");

// 위시리스트 아이템 삭제
router.delete("/items/:bookId");

module.exports = router;
