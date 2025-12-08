const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

// 생성
router.post("/", (req, res) => {
    res.send("create user");
});

// 조회
router.get("/:id", (req, res) => {
    res.send(`${req.params.id} 유저 조회`)
});
router.get("/", (req, res) => {
    res.send("유저 전체 조회")
});

// 수정
router.patch("/:id", (req, res) => {

    res.send(`${req.params.id} 유저 수정`)
});
router.patch("/:id/password", (req, res) => {
    res.send(`${req.params.id} 유저 비밀번호 수정`)
});

// 삭제
router.delete("/:id", (req, res) => {
    res.send(`${req.params.id} 유저 삭제`)
});


module.exports = router;