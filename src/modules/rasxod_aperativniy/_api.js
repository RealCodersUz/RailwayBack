const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postRasxod,
  getRasxod,
  getRasxods,
  deleteRasxod,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/is-admin");
// const upload = require("../../shared/uploads");

const router = express.Router();

router.post("/rasxod", isLoggedIn, postRasxod);
router.get("/rasxod", isLoggedIn, getRasxods);
router.get("/rasxod/:id", isLoggedIn, getRasxod);
router.delete("/rasxod/:id", isLoggedIn, isAdmin, deleteRasxod);
// router.patch("/archive/:id", isLoggedIn, isAdmin, patchArchive);

module.exports = router;
