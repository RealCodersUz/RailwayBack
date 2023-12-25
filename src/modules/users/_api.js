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
  updatePassword,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/is-admin");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ run: "Ha ishlayabti, havotir bo'lmang" });
});

router.get("/dev", (req, res) => {
  res.json({
    BackEnd_Dasturchilar: {
      1: "Saidqodirxon Rahimov",
      2: "Muhammadjon Abduvahobov",
    },
  });
});

router.post("/users", isLoggedIn, isAdmin, postRegisterUser);
router.get("/users", isLoggedIn, isAdmin, getUsers);
router.post("/users/login", postLoginUser);
router.get("/users/me", isLoggedIn, getMe);
router.get("/users/:id", isLoggedIn, isAdmin, getUser);
router.get("/users/:id", isLoggedIn, isAdmin, getUsers);
router.patch("/users/me", isLoggedIn, patchMe);
router.patch("/users/:id", isLoggedIn, isAdmin, patchUser);

router.patch("/users/editpass/:id", isLoggedIn, isAdmin, updatePassword);

// router.delete("/users/me", isLoggedIn,isAdmin, deleteMe);
router.delete("/users/:id", isLoggedIn, isAdmin, deleteUser);

module.exports = router;
