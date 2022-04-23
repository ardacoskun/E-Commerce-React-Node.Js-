const axios = require("axios");

const getCartProducts = (request) => {
  const products = request.data.items;
  return products;
};

const getProductIds = (cartProducts) => {
  const productIds = [];
  for (let product of cartProducts) {
    const productId = product.productId;
    productIds.push(productId);
  }
  return productIds;
};

const getProductInfos = async (productsIds) => {
  const productsNames = [];
  const productImages = [];
  for (let productId of productsIds) {
    const response = await axios.get(
      `${process.env.BASE_URL}products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`
    );

    productsNames.push(response.data[0].name);
    productImages.push(response.data[0].image_groups[0].images[0].link);
  }

  return { productsNames, productImages };
};

module.exports = {
  getCartProducts,
  getProductIds,
  getProductInfos,
};
