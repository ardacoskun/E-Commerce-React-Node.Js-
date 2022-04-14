const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

//Get All Categories
router.get("/", categoryController.getAllCategories);

//Get Parent Categories
router.get("/:parentId", categoryController.getParentCategories);

//Get Parent SubCategories
router.get("/:parentId/:subcategoryId", categoryController.getSubCategories);

module.exports = router;
