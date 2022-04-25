const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong",
  };

  if (err.message === "Request failed with status code 400") {
    defaultError.statusCode = 400;
    defaultError.msg = err.response.data.error;
  }

  res
    .status(defaultError.statusCode)
    .json({ msg: defaultError.msg, statusCode: defaultError.statusCode });
};

module.exports = errorHandlerMiddleware;
