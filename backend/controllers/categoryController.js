const axios = require("axios");

const baseUrl = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey =
  "$2a$08$VOYiDPDRsbjFt2bg/lKAm.piUbWL/0F.ts09ZaYht7Nx0m8Jp.Cv6";

//GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
  try {
    const response = await axios.get(
      `${baseUrl}categories?secretKey=${secretKey}`
    );

    return await res.json(response.data);
  } catch (error) {
    //return res.json(error);
  }
};

module.exports = { getAllCategories };
