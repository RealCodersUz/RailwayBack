const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const {
  postRegisterUser,
  postLoginUser,
  patchMe,
  getMe,
  // deleteMe,
  getUser,
  deleteUser,
  patchUser,
  getUsers,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/is-admin");

const router = express.Router();

router.post("/users", isLoggedIn, isAdmin, postRegisterUser);
router.get("/users", isLoggedIn, isAdmin, getUsers);
router.post("/users/login", postLoginUser);
router.get("/", (req, res) => {
  res.json({ say: "hello" });
});
router.get("/users/me", isLoggedIn, getMe);
router.get("/users/:id", isLoggedIn, isAdmin, getUser);
router.get("/users/:id", isLoggedIn, isAdmin, getUsers);
router.patch("/users/me", isLoggedIn, patchMe);
router.patch("/users/:id", isLoggedIn, isAdmin, patchUser);
// router.delete("/users/me", isLoggedIn,isAdmin, deleteMe);
router.delete("/users/:id", isLoggedIn, isAdmin, deleteUser);

module.exports = router;
