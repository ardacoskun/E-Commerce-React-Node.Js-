const axios = require("axios");
const CartServices = require("../services/CartServices");
const OutOfStockError = require("../errors/outOfStockError");

const getWishlist = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${process.env.BASE_URL}/wishlist?secretKey=${process.env.SECRET_KEY}`,
    config
  );

  const wishlistProducts = response.data.items;
  const wishlistProductsIds = CartServices.getProductIds(wishlistProducts);

  const wishlistProductsVariants =
    CartServices.cartProductsVariantsId(wishlistProducts);

  const allWishlistProducts = await CartServices.getCartProducts(
    wishlistProductsIds
  );
  const colors = CartServices.getVariantColors(
    allWishlistProducts,
    wishlistProductsVariants
  );
  const sizes = CartServices.getVariantSizes(
    allWishlistProducts,
    wishlistProductsVariants
  );
  const widths = CartServices.getVariantWidths(
    allWishlistProducts,
    wishlistProductsVariants
  );

  const productNames = CartServices.getProductNames(allWishlistProducts);
  const productImages = CartServices.getProductImages(allWishlistProducts);

  res.status(200).send({
    colors,
    sizes,
    widths,
    wishlistProducts,
    productNames,
    productImages,
  });
};

const addItemToWishlist = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { productId, quantity, productAttributes, endpoint } = req.body;

  const productVariants = await CartServices.getSingleProductVariants(
    productId
  );

  const variantId = CartServices.findVariantId(
    productVariants,
    productAttributes
  );
  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
    quantity,
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/${endpoint}/addItem`,
    productData,
    config
  );
  const data = response.items;
  res.status(201).send(data);
};
const removeItemFromWishlist = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { productId, variantId } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
  };

  await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/wishlist/removeItem`,
    data: productData,
    headers: config.headers,
  });

  res.status(202).json({ msg: "Item removed from the wishlist" });
};

const changeQuantityOfWishlistItem = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { productId, variantId, quantity } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
    quantity,
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/wishlist/changeItemQuantity`,
    productData,
    config
  );
  res.status(202).json(response.data);
};

module.exports = {
  getWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  changeQuantityOfWishlistItem,
};
