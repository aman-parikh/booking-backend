const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const { errorHandler } = require("../utils/error-handler");
const Error = require("../utils/error");

import { Error } from "../utils/error.js";

const verifyToken = errorHandler(async(req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
});

const verifyUser = errorHandler((req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
});

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = {
    verifyUser, verifyAdmin, verifyToken
}