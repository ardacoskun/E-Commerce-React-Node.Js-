const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({ msg: "Error!!" });
};

module.exports = errorHandlerMiddleware;
