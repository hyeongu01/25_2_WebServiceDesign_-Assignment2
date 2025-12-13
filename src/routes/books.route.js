/**
 * @openapi
 * tags:
 *   - name: Books
 *     description: Book endpoints
 */
const express = require("express");
const router = express.Router();
const BookController = require("../controllers/user.controller");

// 책 등록
router.post("/");

// 책 목록 조회
router.get("/");

// 책 상세 조회
router.get("/:id");

// 책 수정
router.patch("/:id");

// 책 삭제
router.delete("/:id");

// books <-> categories
// 카테고리 추가
router.post("/:bookId/categories/:categoryId");

// 카테고리 삭제
router.delete("/:bookId/categories/:categoryId");

// books <-> authors
// 저자 추가
router.post("/:bookId/authors/:authorId");

// 저자 삭제
router.delete("/:bookId/authors/:authorId");

// books <-> reviews
// 도서에 리뷰 생성
router.post("/:id/reviews");

// 도서의 리뷰 전체 확인
router.get("/:id/reviews");

module.exports = router;