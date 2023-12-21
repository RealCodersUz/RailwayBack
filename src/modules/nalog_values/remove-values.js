const { NotFoundError } = require("../../shared/errors");
const Archive = require("./Values");

const removeArchive = async ({ id }) => {
  const existing = await Archive.findOne({ _id: id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  return Archive.findByIdAndUpdate(id, {
    is_deleted: true,
    name: `${existing.name}_${Date.now()}_deleted`,
  }).select("-is_deleted");
};

module.exports = removeArchive;
