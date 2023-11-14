const { NotFoundError } = require("../../shared/errors");
const Archive = require("./Archives");

async function listArchives() {
  const archive = await Archive.find().select("-is_deleted");

  if (!archive) {
    throw new NotFoundError("Arxiv topilmadi.");
  }

  return archive;
}

module.exports = listArchives;
