const { NotFoundError } = require("../../shared/errors");
const Archive = require("./AdmData");
/**
 * @param {object} deps
 * @param {import('./AdmData')} deps.Archive
 */
async function showArchive({ id }) {
  const archive = await Archive.findOne({ _id: id, is_deleted: false }).select(
    "-is_deleted"
  );

  if (!archive) {
    throw new NotFoundError("Arxiv topilmadi.");
  }

  return archive;
}

module.exports = showArchive;
