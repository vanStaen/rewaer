const jsonwebtoken = require("jsonwebtoken");
require("dotenv/config");

const devMode = true;

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  // if in development mode
  if (devMode) {
    console.log(">>> Developement Mode ACTIVATED <<<")
    req.isAuth = true;
    req.userId = "1";
    req.email = "test@test.com";
    return next();
  }

  // if no authorization header found
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // Authorization: Bearer <token>
  const token = authHeader.split(" ")[1];
  if (!token || token === "undefined" || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;

  // Debug:
  // console.log("email:", req.email);
  // console.log("userId:", req.userId);

  next();
};
