const axios = require("axios");
const CategoryServices = require("../services/CategoryServices");
const NotFoundError = require("../errors/notFoundError");

//GET SEARCHED PRODUCTS
const getSearchedProducts = async (req, res) => {
  const keyword = req.query.keyword;

  const { data } = await axios.get(
    `${process.env.BASE_URL}categories?secretKey=${process.env.SECRET_KEY}`
  );

  const products = await CategoryServices.getAllProducts(data, keyword);

  if (products.length <= 0) {
    throw new NotFoundError(`No search results found for "${keyword}"`);
  }

  return res.status(200).send(products);
};

module.exports = { getSearchedProducts };
