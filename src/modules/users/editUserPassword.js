const { NotFoundError } = require("../../shared/errors");
const bcryptjs = require("bcryptjs");
const User = require("./User");

async function editUserPassword({ id, ...changes }) {
  const existing = await User.findOne({ _id: id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  const hashedPassword = await bcryptjs.hash(changes.password, 10);

  const result = await User.findByIdAndUpdate(
    { _id: id },
    { password: hashedPassword },
    { new: true }
  ).select("password");

  return result;
}

module.exports = editUserPassword;
