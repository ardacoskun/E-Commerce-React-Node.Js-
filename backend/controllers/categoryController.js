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

//GET PARENT CATEGORIES
const getParentCategories = async (req, res) => {
  const { parentId } = req.params;
  try {
    const response = await axios.get(
      `${baseUrl}categories/parent/${parentId}?secretKey=${secretKey}`
    );
    return await res.json(response.data);
  } catch (error) {
    //return res.json(error);
  }
};

//GET SUBCATEGORIES
const getSubCategories = async (req, res) => {
  const { parentId, subcategoryId } = req.params;
  try {
    const response = await axios.get(
      `${baseUrl}categories/parent/${parentId}-${subcategoryId}?secretKey=${secretKey}`
    );
    return await res.json(response.data);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { getAllCategories, getParentCategories, getSubCategories };
