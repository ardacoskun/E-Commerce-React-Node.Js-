const axios = require("axios");
const OutOfStockError = require("../errors/outOfStockError");

const getProductIds = (cartProducts) => {
  const productIds = [];
  for (let product of cartProducts) {
    const productId = product.productId;
    productIds.push(productId);
  }

  return productIds;
};

const getProductNames = (allCartProducts) => {
  const productsNames = [];
  for (let name of allCartProducts) {
    productsNames.push(name[0].name);
  }

  return productsNames;
};

const getProductImages = (allCartProducts) => {
  const productsImages = [];
  for (let image of allCartProducts) {
    productsImages.push(image[0].image_groups[0].images[0].link);
  }

  return productsImages;
};

const getCartProducts = async (productsIds) => {
  let cartProducts = [];
  for (let productId of productsIds) {
    const { data } = await axios.get(
      `${process.env.BASE_URL}products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`
    );

    cartProducts.push(data);
  }
  return cartProducts;
};

const cartProductsVariantsId = (cartProducts) => {
  const productVariantsId = [];
  for (let eachProduct of cartProducts) {
    const variantId = eachProduct.variant.product_id;
    productVariantsId.push(variantId);
  }
  return productVariantsId;
};

const getVariantColors = (allCartProducts, cartProductsVariants) => {
  let color = 0;
  let itemColor = 0;
  const colors = [];
  for (let i = 0; i < allCartProducts.length; i++) {
    const productData = allCartProducts[i][0];
    for (let variant of productData.variants) {
      if (variant.product_id === cartProductsVariants[i]) {
        color = variant.variation_values.color;
        for (let attributes of productData.variation_attributes) {
          if (attributes.id === "color") {
            for (let values of attributes.values) {
              if (values.value === color) {
                color = values.name;
                itemColor = values.value;
              }
            }
          }
        }
      }
    }
    colors.push({
      color,
    });
  }
  return colors;
};

const getVariantSizes = (allCartProducts, cartProductsVariants) => {
  let size = 0;
  let itemSize = 0;
  const sizes = [];
  for (let i = 0; i < allCartProducts.length; i++) {
    const productData = allCartProducts[i][0];
    for (let variant of productData.variants) {
      if (variant.product_id === cartProductsVariants[i]) {
        size = variant.variation_values.size;
        for (let attributes of productData.variation_attributes) {
          if (attributes.name === "size" || attributes.name === "Size") {
            for (let values of attributes.values) {
              if (values.value === size) {
                size = values.name;
                itemSize = values.value;
              }
            }
          }
        }
      }
    }
    sizes.push({
      size,
    });
  }
  return sizes;
};

const getVariantWidths = (allCartProducts, cartProductsVariants) => {
  let width = 0;
  let itemWidth = 0;
  const allWidths = [];
  for (let i = 0; i < allCartProducts.length; i++) {
    const productData = allCartProducts[i][0];
    for (let variant of productData.variants) {
      if (variant.product_id === cartProductsVariants[i]) {
        width = variant.variation_values.width;
        for (let attributes of productData.variation_attributes) {
          if (attributes.id === "width") {
            for (let values of attributes.values) {
              if (values.value === width) {
                width = values.name;
                itemWidth = values.value;
              }
            }
          }
        }
      }
    }
    allWidths.push({
      width,
    });
  }
  return allWidths;
};

const getSingleProductVariants = async (productId) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}products/product_search?id=${productId}&secretKey=${process.env.SECRET_KEY}`
  );

  const variants = data[0].variants;

  return variants;
};

const findVariantId = (productVariants, productAttributes) => {
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
  getProductIds,
  getCartProducts,
  findVariantId,
  cartProductsVariantsId,
  getVariantColors,
  getVariantSizes,
  getVariantWidths,
  getProductNames,
  getProductImages,
  getSingleProductVariants,
};
