const axios = require("axios");

//GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}categories?secretKey=${process.env.SECRET_KEY}`
    );

    return await res.json(response.data);
  } catch (error) {
    //return res.json(error);
  }
};

//GET ROOT CATEGORIES
const getRootCategories = async (req, res) => {
  const { parentId } = req.params;
  try {
    const response = await axios.get(
      `${baseUrl}categories/${parentId}?secretKey=${secretKey}`
    );

    return await res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
};

//GET PARENT CATEGORIES
const getParentCategories = async (req, res) => {
  const { parentId } = req.params;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}categories/parent/${parentId}?secretKey=${process.env.SECRET_KEY}`
    );
    return await res.json(response.data);
  } catch (error) {
    //return res.json(error);
  }
};

//GET SUBCATEGORIES
const getSubCategories = async (req, res) => {
  const { parentId, subcategoryId } = req.params;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}categories/parent/${parentId}-${subcategoryId}?secretKey=${process.env.SECRET_KEY}`
    );
    return await res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
};

//GET PRODUCTS
const getProducts = async (req, res) => {
  const { productCategoryId } = req.params;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}products/product_search?primary_category_id=${productCategoryId}&secretKey=${process.env.SECRET_KEY}`
    );
    return await res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
};

//GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`
    );

    return await res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  getAllCategories,
  getParentCategories,
  getRootCategories,
  getSubCategories,
  getProducts,
  getSingleProduct,
};
