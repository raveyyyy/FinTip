const jwt = require("jsonwebtoken");

const verifyToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2m",
  });
module.exports = verifyToken;
