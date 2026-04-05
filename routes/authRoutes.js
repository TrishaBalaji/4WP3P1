const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.showLogin);
router.get("/mypage", authController.showLogin);
router.post("/mypage", authController.login);

module.exports = router;
