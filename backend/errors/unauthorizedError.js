const CustomApiError = require("./customApiError");

class UnAuthorizedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthorizedError;
