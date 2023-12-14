const multer = require("multer");
const crypto = require("crypto");
let unique = crypto.randomUUID();
// console.log(unique);
// console.log(unique);
const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
let sana = new Date().getTime();
console.log(sana, "time");
const formattedDate = new Intl.DateTimeFormat("default", options).format(sana);
let replacedStr = formattedDate.replace(/\//g, "_");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    // const ext = file.originalname.split(".").pop();
    cb(
      null,
      replacedStr + "_" + req.user.branch_name + "_" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
