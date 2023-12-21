const { NotFoundError } = require("../../shared/errors");
const Rasxod = require("./Rasxod");

const removeRasxod = async ({ id }) => {
  const existing = await Rasxod.findOne({ _id: id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Rasxod topilmadi.");
  }

  return Rasxod.findByIdAndUpdate(id, {
    is_deleted: true,
    // name: `${existing.name}_${Date.now()}_deleted`,
  }).select("-is_deleted");
};

module.exports = removeRasxod;
