const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const orderRoutes = require("./routes/orderRoutes");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authCheck = require("./middleware/authCheck");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("working");
// });

app.use("/auth", authRoutes);
app.use("/cart", authCheck, cartRoutes);
app.use("/wishlist", authCheck, wishlistRoutes);
app.use("/checkout", authCheck, stripeRoutes);
app.use("/orders", authCheck, orderRoutes);
app.use("/payment", stripeRoutes);
app.use("/", categoryRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
