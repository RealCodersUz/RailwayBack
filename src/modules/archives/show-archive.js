const { NotFoundError } = require("../../shared/errors");
const Archive = require("./Archives");
/**
 * @param {object} deps
 * @param {import('./Archives')} deps.Archive
 */
async function showArchive({ id }) {
  const archive = await Archive.findOne({ _id: id, is_deleted: false }).select(
    "-is_deleted"
  );

  if (!archive) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  return archive;
}

module.exports = showArchive;
