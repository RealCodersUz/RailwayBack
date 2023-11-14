const bcryptjs = require("bcryptjs");
const Archive = require("./Archives");
async function addArchive(data) {
  const result = await Archive.create({
    ...data,
  });

  return result;
}

module.exports = addArchive;
