const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postValue,
  getValue,
  getValues,
  deleteValue,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/is-admin");
// const upload = require("../../shared/uploads");

const router = express.Router();

router.post("/nalog_value", isLoggedIn, postValue);
router.get("/nalog_value", isLoggedIn, getValues);
router.get("/nalog_value/:id", isLoggedIn, getValue);
router.delete("/nalog_value/:id", isLoggedIn, isAdmin, deleteValue);
// router.patch("/archive/:id", isLoggedIn, isAdmin, patchArchive);

module.exports = router;
