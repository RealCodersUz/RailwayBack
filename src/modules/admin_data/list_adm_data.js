const { NotFoundError } = require("../../shared/errors");
const User = require("../users/User");
const Values = require("./AdmData");
// const Archive = require("./Values");

async function listAdmData(reqQuery, userId) {
  const {
    search,
    category,
    sortBy,
    sortOrder,
    limit,
    offset,
    type,
    month,
    year,
  } = reqQuery;
  // let user = await User.findById(userId);
  // console.log(userId);
  // console.log(user.reports);
  // let query = Archive.find({ _id: user.reports[0], is_deleted: false });
  let query = Values.find({ is_deleted: false });
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
    // const archives = await query.exec();
    // console.log(1);
    const datas = await Values.find({ is_deleted: false });
    console.log(datas);
    const valuesQuery = Values.find({
      // type: type,
      month: month,
      year: year,
      // _id: { $in: user.reports }, // To'plamdagi ID lar bilan solishtirish
    });
    let valuesOwn = await valuesQuery.exec();
    // (err, results) => {
    //   if (err) {
    //     console.error("Xatolik yuz berdi: ", err); // Xatolikni chiqaring
    //   } else {
    //     console.log("Topilgan natijalar: ", results); // Natijalarni chiqaring
    //   }
    // }
    // let boshArr = [];
    // valuesOwn.values.map((e) => {
    //   boshArr.push(e[0]);
    // });
    // console.log(boshArr, "bosharr");
    return valuesOwn;
  } catch (err) {
    return err.message;
  }
  // const archive = await Archive.find().select("-is_deleted");

  if (!query) {
    throw new NotFoundError("Arxiv topilmadi.");
  }

  // return query;
}

module.exports = listAdmData;
