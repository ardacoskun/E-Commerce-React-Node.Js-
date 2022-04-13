const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

//Get All Categories
router.get("/", categoryController.getAllCategories);

module.exports = router;
