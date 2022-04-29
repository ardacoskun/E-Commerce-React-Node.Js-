const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validation = require("../middleware/validation");

//POST REGISTER
router.post("/register", validation, authController.register);

//POST LOGIN
router.post("/login", validation, authController.login);

module.exports = router;
