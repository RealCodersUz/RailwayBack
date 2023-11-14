const express = require("express");
const cors = require("cors");
const db = require("./db");
const config = require("./shared/config");
// const handleError = require("./shared/errors/handle");
const usersRoute = require("./modules/users/_api");
// const guideRoute = require("./modules/guides/_api");
// const userGuideRoute = require("./modules/user_guide/_api");

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRoute);
// app.use(guideRoute);
// app.use(userGuideRoute);

// app.use(handleError);

db().then(() => {
  app.listen(config.port, () => {
    console.log(`Server ${config.port}-portda ishlayapti.`);
  });
});

module.exports = app;
