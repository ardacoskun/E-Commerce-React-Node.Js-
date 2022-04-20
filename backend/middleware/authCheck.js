const UnAuthorizedError = require("../errors/unauthorizedError");

const authCheck = async (req, res, next) => {
  const token = await req.cookies.jwt;

  if (!token) {
    throw new UnAuthorizedError("Invalid Authorization");
  }

  req.token = token;

  next();
};

module.exports = authCheck;
