const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postRegisterUser,
  postLoginUser,
  patchMe,
  getMe,
  deleteMe,
  getUser,
  deleteUser,
  patchUser,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/is-admin");

const router = express.Router();

router.post("/users", isLoggedIn, isAdmin, postRegisterUser);
router.post("/users/login", postLoginUser);
router.get("/users/me", isLoggedIn, getMe);
router.get("/users/:id", isLoggedIn, isAdmin, getUser);
router.patch("/users/me", isLoggedIn, patchMe);
router.patch("/users/:id", isLoggedIn, patchUser);
router.delete("/users/me", isLoggedIn, deleteMe);
router.delete("/users/:id", isLoggedIn, deleteUser);

module.exports = router;
