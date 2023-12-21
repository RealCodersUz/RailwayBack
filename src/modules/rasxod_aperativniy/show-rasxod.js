const { NotFoundError } = require("../../shared/errors");
const Rasxod = require("./Rasxod");
/**
 * @param {object} deps
 * @param {import('./Rasxod')} deps.Rasxod
 */
async function showRasxod({ id }) {
  const rasxod = await Rasxod.findOne({ _id: id, is_deleted: false }).select(
    "-is_deleted"
  );

  if (!rasxod) {
    throw new NotFoundError("Arxiv topilmadi.");
  }

  return rasxod;
}

module.exports = showRasxod;
