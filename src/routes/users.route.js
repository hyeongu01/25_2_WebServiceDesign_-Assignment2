const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

// 조회
router.get("/:id", (req, res) => {
    res.send(`${req.params.id} 유저 조회`)
});
router.get("/", (req, res) => {
    res.send("유저 전체 조회")
});
router.get("/me", (req, res) => {
    res.send("본인 정보 조회")
})

// 수정
router.patch("/:id", (req, res) => {

    res.send(`${req.params.id} 유저 수정`)
});
router.patch("/me", (req, res) => {
    res.send("내 정보 수정");
})
router.patch("/me/password", (req, res) => {
    res.send(`${req.params.id} 유저 비밀번호 수정`)
});

// 삭제
router.delete("/me", (req, res) => {
    res.send(`본인 유저 정보 삭제`)
});

router.delete("/:id", (req, res) => {
    res.send('관리자 유저 삭제')
})

router.patch("/:id", (req, res) => {
    res.send('관리자 유저 복구')
})


module.exports = router;