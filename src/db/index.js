const mongoose = require("mongoose");

module.exports = async function () {
  return mongoose
    .connect(process.env.MONGO_ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB ga ulandi.");
    })
    .catch((err) => {
      console.log("DB da xatolik: ", err);
    });
};
