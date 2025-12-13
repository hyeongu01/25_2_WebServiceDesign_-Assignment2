const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

// 미들웨어
const Middleware = require("../middlewares/auth.middleware");

// 조회
// 내 정보 조회
router.get("/me", Middleware.authenticate, UserController.getMyUser)

// 유저 전체 조회
router.get("/", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.getAllUsers);

// 숫자 id만 허용하도록 라우트 패턴을 제한 (예: /users/1)
router.get("/:id", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.getUserById);

// 수정
router.patch("/:id", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.updateUser);
router.patch("/me", Middleware.authenticate, UserController.updateMyUser);
router.patch("/me/password", Middleware.authenticate, UserController.changeMyPassword);

// 삭제
router.delete("/me", Middleware.authenticate, UserController.deleteMyUser);

router.delete("/:id", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.deleteUser)

router.patch("/:id/restore", Middleware.authenticate, Middleware.authenticateRole(["ADMIN"]), UserController.restoreUser)


module.exports = router;