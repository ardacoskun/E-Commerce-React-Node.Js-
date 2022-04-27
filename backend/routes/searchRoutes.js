const express = require("express");
const router = express.Router();

const searchController = require("../controllers/searchController");

//Get Searched Products
router.get("/", searchController.getSearchedProducts);

module.exports = router;
