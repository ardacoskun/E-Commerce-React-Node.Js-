const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const categoryRoutes = require("./routes/categoryRoutes");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

// app.get("/", (req, res) => {
//   res.send("working");
// });

app.use("/", categoryRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
