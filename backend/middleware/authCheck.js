const UnAuthorizedError = require("../errors/unauthorizedError");

const authCheck = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new UnAuthorizedError("Invalid Authorization");
  }

  req.token = token.replace("Bearer ", "");

  next();
};

module.exports = authCheck;
