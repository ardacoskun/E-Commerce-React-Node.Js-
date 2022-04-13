const express = require("express");

const app = express();

const categoryRoutes = require("./routes/categoryRoutes");

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.use("/categories", categoryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
