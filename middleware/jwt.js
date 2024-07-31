const jwt = require("jsonwebtoken"),
  Users = require("../models/Users");

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

exports.validate = (req, res, proceed) => {
  const { authorization } = req.headers;

  if (authorization) {
    if (
      authorization.startsWith(process.env.JWT_HEADER) ||
      authorization.startsWith("verify")
    ) {
      verifyToken(authorization.split(" ")[1])
        .then(response => {
          Users.findById(response._id)
            .select("-password")
            .populate({
              path: "role",
              select: "-__v -createdAt -updatedAt -_id",
            })
            .then(user => {
              if (user) {
                res.locals.caller = user;
                proceed();
              } else {
                res.status(404).json({
                  error: "User Not Found",
                  message: "The provided Credentials does not exist.",
                });
              }
            })
            .catch(() =>
              res.status(401).json({
                error: "Invalid Token",
                message: "The provided token contains invalid information.",
              })
            );
        })
        .catch(() =>
          res.status(401).json({
            error: "Invalid Token",
            message: "The provided token is either invalid or expired.",
          })
        );
    } else {
      res.status(400).json({
        error: "Invalid Token",
        message: "The provided token is not in the correct format.",
      });
    }
  } else {
    res.status(401).json({
      error: "Unauthorized",
      message: "Authentication token is missing or invalid.",
    });
  }
};

exports.notFound = (req, res, proceed) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  proceed(error);
};

exports.errorHandler = (err, req, res, proceed) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
