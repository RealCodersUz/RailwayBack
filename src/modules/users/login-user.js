const jwt = require("jsonwebtoken");
const config = require("../../shared/config");
const { UnauthorizedError } = require("../../shared/errors");
const bcryptjs = require("bcryptjs");
const User = require("./User");

async function loginUser({ username, password }) {
  try {
    const existing = await User.findOne({ username, is_deleted: false });

    if (!existing) {
      throw new UnauthorizedError("Incorrect username or password.");
    }

    const match = await bcryptjs.compare(password, existing.password);

    if (!match) {
      throw new UnauthorizedError("Incorrect username or password.");
    }

    const expiresIn = process.env.JWT_TOKEN_EXPIRATION_DATE;

    const token = jwt.sign(
      {
        user: {
          id: existing._id,
          role: existing.role,
          branch_name: existing.branch_name,
        },
      },
      config.jwt.secret,
      { expiresIn: expiresIn }
    );

    return token;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token expired:", error.expiredAt);
      throw new UnauthorizedError("Token expired.");
    }

    console.error("Error generating token:", error.message);
    throw new UnauthorizedError("Unauthorized.");
  }
}

module.exports = loginUser;
