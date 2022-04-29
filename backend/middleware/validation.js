const ValidationError = require("../errors/validationError");

const validation = (req, res, next) => {
  if (req.body.name) {
    const { name, email, password } = req.body;

    if (name.length < 3) {
      throw new ValidationError("Name must be at least 3 character long");
    }

    if (password.length < 6) {
      throw new ValidationError("Password must be at least 6 character long");
    }

    if (!email.includes("@")) {
      throw new ValidationError(
        "The format of the email address is incorrect. Please fill in again"
      );
    }
  } else {
    const { email, password } = req.body;

    if (password.length < 6) {
      throw new ValidationError("Password must be at least 6 character long");
    }

    if (!email.includes("@")) {
      throw new ValidationError(
        "The format of the email address is incorrect. Please fill in again"
      );
    }
  }
  return next();
};

module.exports = validation;
