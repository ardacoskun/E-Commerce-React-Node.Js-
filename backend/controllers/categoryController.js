const axios = require("axios");
const CategoryServices = require("../services/CategoryServices");
const NotFoundError = require("../errors/notFoundError");
const { nextTick } = require("process");

//GET ROOT CATEGORIES
const getRootCategories = async (req, res) => {
  const { parentId } = req.params;

  const { data } = await axios.get(
    `${process.env.BASE_URL}categories/${parentId}?secretKey=${process.env.SECRET_KEY}`
  );

  return await res.status(200).json(data);
};

//GET PARENT CATEGORIES
const getParentCategories = async (req, res) => {
  const { parentId } = req.params;

  const { data } = await axios.get(
    `${process.env.BASE_URL}categories/parent/${parentId}?secretKey=${process.env.SECRET_KEY}`
  );

  if (data.length <= 0) {
    throw new NotFoundError("Page is not found");
  }

  const categories = await CategoryServices.checkImage(data);

  return await res.status(200).json(categories);
};

//GET SUBCATEGORIES
const getSubCategories = async (req, res) => {
  const { parentId, subcategoryId } = req.params;

  const { data } = await axios.get(
    `${process.env.BASE_URL}categories/parent/${parentId}-${subcategoryId}?secretKey=${process.env.SECRET_KEY}`
  );

  const categories = await CategoryServices.checkImage(data);

  return await res.status(200).json(categories);
};

//GET PRODUCTS
const getProducts = async (req, res, next) => {
  const { productCategoryId } = req.params;

  const { data } = await axios.get(
    `${process.env.BASE_URL}products/product_search?primary_category_id=${productCategoryId}&secretKey=${process.env.SECRET_KEY}`
  );

  return await res.status(200).json(data);
};

//GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  const { productId } = req.params;

  const { data } = await axios.get(
    `${process.env.BASE_URL}products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`
  );

  return await res.status(200).json(data);
};

module.exports = {
  getParentCategories,
  getRootCategories,
  getSubCategories,
  getProducts,
  getSingleProduct,
};
