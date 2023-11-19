const express = require("express");
const cors = require("cors");
const db = require("./src/db");
const config = require("./src/shared/config");
// const handleError = require("./shared/errors/handle");
const usersRoute = require("./src/modules/users/_api");
const archiveRoute = require("./src/modules/archives/_api");
const bodyParser = require("body-parser");
const path = require("path");
// const userGuideRoute = require("./modules/user_guide/_api");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.json({ limit: "2000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2000mb" }));

console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(usersRoute);
app.use(archiveRoute);
// app.use(userGuideRoute);

// app.use(handleError);

db().then(() => {
  app.listen(config.port, () => {
    console.log(`Server ${config.port}-portda ishlayapti.`);
  });
});

module.exports = app;