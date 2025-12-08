const express = require("express");
const { route } = require("./users.route");
const router = express.Router();

// 리뷰 생성: -> books.route.js
// router.post("/books/:id/reviews");

// 도서 리뷰 확인: -> books.route.js
// router.get("/books/:id/reviews");

// 리뷰 상세 확인
router.get("/:id");

// 리뷰 수정
router.patch("/:id");

// 리뷰 삭제
router.delete("/:id");

// review like
// 리뷰 좋아요 추가
router.post("/:id/like");

// 리뷰 좋아요 확인
router.get("/:id/like");

// 리뷰 좋아요 삭제
router.delete("/:id/like");

module.exports = router;