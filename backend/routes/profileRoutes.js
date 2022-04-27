const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

//Get Searched Products
router.get("/", profileController.getProfileInfo);

module.exports = router;
