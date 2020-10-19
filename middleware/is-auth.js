const jsonwebtoken = require("jsonwebtoken");
require("dotenv/config");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authheader) {
    req.isAuth = false;
    return next();
  }
  // Authorization: Bearer <token>
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = true;
    return next();
  }
  jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY);
};
