const express = require("express");
const router = express.Router();

// 카트 읽기
router.get("/");

// 카트 항목 추가
router.post("/items");

// 카트 항목 변경 (수량, 체크 여부)
router.patch("/items/:bookId");

// 카트 항목 삭제
router.delete("/items/:bookId");

