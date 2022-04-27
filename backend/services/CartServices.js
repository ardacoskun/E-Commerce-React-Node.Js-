const axios = require("axios");
const OutOfStockError = require("../errors/outOfStockError");

const getCartProducts = (request) => {
  const products = request.data.items;
  return products;
};

const getProductIds = async (cartProducts) => {
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
    const { data } = await axios.get(
      `${process.env.BASE_URL}products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`
    );

    productsNames.push(data[0].name);
    productImages.push(data[0].image_groups[0].images[0].link);
  }

  return { productsNames, productImages };
};

const getVariantId = (productAttributes, productVariants) => {
  let variantId = 0;
  const color = productAttributes.color;
  const size = productAttributes.size;
  const width = productAttributes.width;

  for (let variant of productVariants) {
    const values = variant.variation_values;

    values.color ? values.color : (values.color = "");
    values.size ? values.size : (values.size = "");
    values.width ? values.width : (values.width = "");

    if (color && !size && !width) {
      if (color === values.color) {
        variantId = variant.product_id;
      }
    }

    if (color && size && !width) {
      if (
        (color === values.color && size === values.size) ||
        size === values.accessorySize
      ) {
        variantId = variant.product_id;
      }
    }
    if (color && size && width) {
      if (
        (size === values.accessorySize || size === values.size) &&
        color === values.color &&
        width === values.width
      ) {
        variantId = variant.product_id;
      }
    }
  }
  if (variantId === 0) {
    throw new OutOfStockError("This item is out of stock.");
  } else {
    return variantId;
  }
};

module.exports = {
  getCartProducts,
  getProductIds,
  getProductInfos,
  getVariantId,
};
