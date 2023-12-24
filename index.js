const express = require("express");
const cors = require("cors");
const db = require("./src/db");
const config = require("./src/shared/config");
const bodyParser = require("body-parser");
const path = require("path");
// const handleError = require("./shared/errors/handle");
const usersRoute = require("./src/modules/users/_api");
const admData = require("./src/modules/admin_data/_api");
const valuesRoute = require("./src/modules/values/_api");
const archiveRoute = require("./src/modules/archives/_api");
const rasxodRoute = require("./src/modules/rasxod_aperativniy/_api");
const nalogRaute = require("./src/modules/nalog_values/_api");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.json({ limit: "2000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2000mb" }));

console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(usersRoute);
app.use(valuesRoute);
app.use(archiveRoute);
app.use(admData);
app.use(rasxodRoute);
app.use(nalogRaute);

// app.use(handleError);
// console.log(1);
db().then(() => {
  app.listen(config.port, () => {
    console.log(`Server ${config.port}-portda ishlayapti.`);
  });
});

module.exports = app;
