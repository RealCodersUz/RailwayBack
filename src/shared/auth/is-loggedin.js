const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { UnauthorizedError } = require("../errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, "bu token");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret, {
      ignoreExpiration: true,
    });

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.error("Token expired");
      return res.status(401).json({ error: "Token expired." });
    }

    console.log(decoded, "decoded");
    req.user = decoded.user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token expired:", error.expiredAt);
      return res.status(401).json({ error: "Token expired." });
    }

    console.error("Error decoding token:", error.message);
    return res.status(401).json({ error: "Unauthorized." });
  }
};

module.exports = isLoggedIn;
