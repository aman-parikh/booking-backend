const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const { errorHandler } = require("../utils/error-handler");
const Error = require("../utils/error");

import { Error } from "../utils/error.js";

const verifyToken = errorHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new Error("Unauthorized Request (Missing Token)", 403, null);
  }
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      throw new Error("Unauthorized Request", 403, null);
    }
    req.user = user;
    next();
  });
});

const verifyUser = errorHandler(async (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw new Error("Unauthorized Request", 403, null);
    }
  });
});

const verifyAdmin = errorHandler((req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new Error("Unauthorized Request", 403, null);
    }
  });
});

module.exports = {
  verifyUser,
  verifyAdmin,
  verifyToken,
};
