const axios = require("axios");

const register = async (req, res) => {
  const { name, password, email } = req.body;

  const data = {
    secretKey: process.env.SECRET_KEY,
    name,
    email,
    password,
  };

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}auth/signup`,
      data
    );

    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ msg: "Register Error!" });
  }
};

module.exports = { register };
