const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postValue,
  getAdmDAtas,
  getAdmData,
  deleteValue,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/is-admin");
// const upload = require("../../shared/uploads");

const router = express.Router();

router.post("/admdata", isLoggedIn, postValue);
router.get("/admdata", isLoggedIn, isAdmin, getAdmDAtas);
router.get("/admdata/:id", isLoggedIn, isAdmin, getAdmData);
router.delete("/admdata/:id", isLoggedIn, isAdmin, deleteValue);
// router.patch("/archive/:id", isLoggedIn, isAdmin, patchArchive);

module.exports = router;
