const express = require("express");
const router = express.Router();

// 주문 생성
router.post("/");

// 주문 읽어오기
router.get("/");

// 주문 상세 보기
router.get("/:id");

// 주문 수정
router.patch("/:id");

// 주문 상태 변경
router.patch("/:id/status");

// 주문 삭제
router.delete("/:id");

module.exports = router;