const CustomApiError = require("./customApiError");

class ValidationError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
