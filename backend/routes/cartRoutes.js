const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authCheck = require("../middleware/authCheck");

router.get("/", authCheck, cartController.getCart);

module.exports = router;
