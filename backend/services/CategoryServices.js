const checkImage = (data) => {
  for (let image of data) {
    if (!image.image || image.image === "categories/category_404.png") {
      image.image = "categories/no_image_available.png";
    }
  }
};

module.exports = { checkImage };
