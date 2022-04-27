const axios = require("axios");

const checkImage = async (data) => {
  for (let image of data) {
    if (!image.image || image.image === "categories/category_404.png") {
      image.image = "categories/no_image_available.png";
    }
  }
  return data;
};

const getAllProducts = async (categories, keyword) => {
  const categoryArray = [];

  for (let category of categories) {
    if (
      category.id.split("-").length >= 3 &&
      category.id !== "womens-clothing-feeling-red"
    ) {
      const { data } = await axios.get(
        `${process.env.BASE_URL}/products/product_search?primary_category_id=${category.id}&secretKey=${process.env.SECRET_KEY}`
      );
      for (let product of data) {
        if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
          categoryArray.push(product);
        }
      }
    }
  }
  return categoryArray;
};

module.exports = { checkImage, getAllProducts };
