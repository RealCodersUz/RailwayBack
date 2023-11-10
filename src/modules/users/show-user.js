const { NotFoundError } = require("../../shared/errors");
const User = require("./User");
/**
 * @param {object} deps
 * @param {import('./User')} deps.User
 */
async function showUser({ id }) {
  const user = await User.findOne({ _id: id, is_deleted: false }).select(
    "-password -is_deleted"
  );

  if (!user) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  return user;
}

module.exports = showUser;
