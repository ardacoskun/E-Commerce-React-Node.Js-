const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("working");
// });

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/", categoryRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
