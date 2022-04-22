const CustomApiError = require("./customApiError");

class OutOfStockError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = OutOfStockError;
