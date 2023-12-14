const multer = require("multer");
const crypto = require("crypto");
let unique = crypto.randomUUID();
// console.log(unique);
console.log(unique);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    // const ext = file.originalname.split(".").pop();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
