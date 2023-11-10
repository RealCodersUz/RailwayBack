const bcryptjs = require("bcryptjs");
const User = require("./User");
async function addUser(data) {
  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const result = await User.create({
    ...data,
    password: hashedPassword,
  });

  // const { password, is_deleted, ...rest } = result;

  return result;
}

module.exports = addUser;
