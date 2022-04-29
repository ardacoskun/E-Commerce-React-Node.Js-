const axios = require("axios");
const BadRequestError = require("../errors/badRequestError");

const register = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const data = {
    secretKey: process.env.SECRET_KEY,
    name,
    email,
    password,
  };

  const response = await axios.post(`${process.env.BASE_URL}auth/signup`, data);

  res.status(201).json(response.data);
};

const login = async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const data = {
    secretKey: process.env.SECRET_KEY,
    email,
    password,
  };

  const response = await axios.post(`${process.env.BASE_URL}auth/signin`, data);

  res.status(200).json(response.data);
};

module.exports = { register, login };
