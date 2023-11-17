const { UnauthorizedError } = require("../../shared/errors");
const bcryptjs = require("bcryptjs");
const User = require("./User");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");

async function loginUser({ username, password }) {
  const existing = await User.findOne({ username, is_deleted: false });

  if (!existing) {
    throw new UnauthorizedError("Incorrect username or password.");
  }

  const match = await bcryptjs.compare(password, existing.password);

  if (!match) {
    throw new UnauthorizedError("Incorrect username or password.");
  }

  const token = jwt.sign(
    {
      user: {
        id: existing._id,
        role: existing.role,
        name: existing.name,
        branch_name: existing.branch_name,
      },
    },
    config.jwt.secret
  );

  return token;
}

module.exports = loginUser;
