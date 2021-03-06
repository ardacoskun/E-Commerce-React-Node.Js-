const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

//Get Root Categories
router.get("/categories/:parentId", categoryController.getRootCategories);

//Get Parent Categories
router.get("/:parentId", categoryController.getParentCategories);

//Get Parent SubCategories
router.get("/:parentId/:subcategoryId", categoryController.getSubCategories);

//Get Products
router.get(
  "/:parentId/:subcategoryId/:productCategoryId",
  categoryController.getProducts
);

//Get Single Product
router.get(
  "/:parentId/:subcategoryId/:productCategoryId/:productId",
  categoryController.getSingleProduct
);

module.exports = router;
