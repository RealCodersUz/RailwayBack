const { NotFoundError } = require("../../shared/errors");
const Archive = require("./Archives");

async function listArchives(reqQuery) {
  const { search, category, sortBy, sortOrder, limit, offset } = reqQuery;

  let query = Archive.find({ is_deleted: false });
  try {
    if (search) {
      query = query.find({
        $or: [{ name: { $regex: search, $options: "i" } }],
      });
    }
    if (category) {
      query = query.find({ category: category });
    }

    if (sortBy) {
      const sort = {};
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
      query = query.sort(sort);
    }

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    if (offset) {
      query = query.skip(parseInt(offset, 10));
    }

    const archives = await query.exec();
    return archives;
  } catch (err) {
    return err.message;
  }
  // const archive = await Archive.find().select("-is_deleted");

  if (!query) {
    throw new NotFoundError("Arxiv topilmadi.");
  }

  // return query;
}

module.exports = listArchives;
