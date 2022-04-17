const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//POST REGISTER
router.post("/register", authController.register);

//POST LOGIN
router.post("/login", authController.login);

module.exports = router;
