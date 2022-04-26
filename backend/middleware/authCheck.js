const UnAuthorizedError = require("../errors/unauthorizedError");

const authCheck = async (req, res, next) => {
  const token = (await req.cookies.jwt) || (await req.headers.authorization);

  if (!token) {
    throw new UnAuthorizedError("Invalid Authorization");
  }
  req.token = token.replace("Bearer ", "");

  next();
};

module.exports = authCheck;
