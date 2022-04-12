const express = require("express");
const axios = require("axios");

const app = express();

const baseUrl = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey =
  "$2a$08$VOYiDPDRsbjFt2bg/lKAm.piUbWL/0F.ts09ZaYht7Nx0m8Jp.Cv6";

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.get("/categories", async (req, res) => {
  axios
    .get(`${baseUrl}categories?secretKey=${secretKey}`)
    .then((response) => res.json(response.data));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
