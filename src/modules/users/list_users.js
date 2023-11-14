const { NotFoundError } = require("../../shared/errors");
const User = require("./User");
/**
 * @param {object} deps
 * @param {import('./User')} deps.User
 */
async function listUsers() {
  const user = await User.find().select("-password -is_deleted");

  if (!user) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  return user;
}

module.exports = listUsers;
