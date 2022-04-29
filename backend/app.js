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
const searchRoutes = require("./routes/searchRoutes");
const profileRoutes = require("./routes/profileRoutes");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authCheck = require("./middleware/authCheck");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("working");
// });

app.use("/api/auth", authRoutes);
app.use("/api/cart", authCheck, cartRoutes);
app.use("/api/wishlist", authCheck, wishlistRoutes);
app.use("/api/checkout", authCheck, stripeRoutes);
app.use("/api/orders", authCheck, orderRoutes);
app.use("/api/profile", authCheck, profileRoutes);
app.use("/api/payment", stripeRoutes);
app.use("/api/search", searchRoutes);
app.use("/api", categoryRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
