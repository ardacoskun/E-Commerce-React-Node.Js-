const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const cors = require("cors");
const Sentry = require("@sentry/node");
const { BrowserTracing } = require("@sentry/tracing");

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
app.use(cors());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

Sentry.init({
  dsn: "https://fc3196bb386343c783f344709654e47b@o1218322.ingest.sentry.io/6360339",
  integrations: [
    new BrowserTracing(),
    new Sentry.Integrations.Http({ tracing: true }),
  ],
  debug: true,
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

Sentry.configureScope((scope) => {
  scope.setSpan(transaction);
});

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
