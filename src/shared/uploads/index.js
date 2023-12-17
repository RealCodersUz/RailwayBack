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
const reportsData = [
  { name: "Расходы", nameLn: "rasxod.xlsx" },
  { name: "Форма 69", nameLn: "forma69.xlsx" },
  { name: "Debit kredit", nameLn: "Debit_kredit.xlsx" },
  { name: "Основные инструменты", nameLn: "Osnovnie_sredstvo.xlsx" },
  { name: "Материальный отчет", nameLn: "Materialni_Otchet.xlsx" },
  { name: "Налог", nameLn: "Nalog.xlsx" },
];
let sana = new Date().getTime();
console.log(sana, "time");
const formattedDate = new Intl.DateTimeFormat("default", options).format(sana);
let replacedStr = formattedDate.replace(/\//g, "_");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const mname = req.body.type;
    console.log(mname);
    console.log("data", req.body);
    const foundReport = reportsData.find((report) => report.name === mname);
    console.log(foundReport);
    if (foundReport) {
      console.log("Topilgan ma'lumot: ", foundReport);

      cb(
        null,
        req.user.branch_name +
          "_" +
          req.body.month +
          "_" +
          req.body.year +
          "_" +
          foundReport.nameLn
      );
    } else {
      return { message: "Bunday nomli ma'lumot topilmadi" };
    }
    // const ext = file.originalname.split(".").pop();
    // cb(
    //   null,
    //   req.user.branch_name + "_" + replacedStr + "_" + file.originalname
    // );
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
