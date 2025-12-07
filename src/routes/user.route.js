const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// 생성
router.post("/");

// 조회
router.get("/:id");
router.get("/");

// 수정
router.patch("/:id");
router.patch("/:id/password");

// 삭제
router.delete("/:id");

