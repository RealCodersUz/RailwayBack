const { NotFoundError } = require("../../shared/errors");
const AdmData = require("./AdmData");
/**
 * @param {object} deps
 * @param {import('./AdmData')} deps.AdmData
 */
async function showAdmData({ id }) {
  const admData = await AdmData.findOne({ _id: id, is_deleted: false }).select(
    "-is_deleted"
  );

  if (!admData) {
    throw new NotFoundError("Arxiv topilmadi.");
  }

  return admData;
}

module.exports = showAdmData;
