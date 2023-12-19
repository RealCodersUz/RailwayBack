const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postArchive,
  getArchive,
  getArchives,
  patchArchive,
  deleteArchive,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/is-admin");
// const upload = require("../../shared/uploads");

const router = express.Router();

router.post("/value", isLoggedIn, postValue);
router.get("/value", isLoggedIn, getValues);
router.get("/value/:id", isLoggedIn, getValue);
// router.patch("/archive/:id", isLoggedIn, isAdmin, patchArchive);
// router.delete("/archive/:id", isLoggedIn, isAdmin, deleteArchive);

module.exports = router;
