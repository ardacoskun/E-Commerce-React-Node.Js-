const CustomApiError = require("./customApiError");

class IsNotAvailableError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = IsNotAvailableError;
