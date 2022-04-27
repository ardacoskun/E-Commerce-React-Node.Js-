const ProfileServices = require("../services/ProfileServices");

const getProfileInfo = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const cartCount = await ProfileServices.getCartCount(config);
  const wishlistCount = await ProfileServices.getWishlistCount(config);

  const profileInfo = {
    cartCount,
    wishlistCount,
  };

  res.status(200).json(profileInfo);
};

module.exports = {
  getProfileInfo,
};
