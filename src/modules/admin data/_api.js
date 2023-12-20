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

router.post("/admdata", isLoggedIn, postValue);
router.get("/admdata", isLoggedIn,isAdmin, getValues);
router.get("/admdata/:id", isLoggedIn,isAdmin, getValue);
router.delete("/admdata/:id", isLoggedIn, isAdmin, deleteValue);
// router.patch("/archive/:id", isLoggedIn, isAdmin, patchArchive);

module.exports = router;
