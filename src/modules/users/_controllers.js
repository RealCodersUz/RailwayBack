const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postRegisterUserSchema,
  postLoginUserSchema,
  patchMeSchema,
  patchUserSchema,
  showUserSchema,
  deleteUserSchmea,
  updatePasswordSchema,
} = require("./_schemas");
//
const addUser = require("./add-user");
const editUser = require("./edit-user");
const showUser = require("./show-user");
const removeUser = require("./remove-user");
const loginUser = require("./login-user");
const listUsers = require("./list_users");
const editUserPassword = require("./editUserPassword");
//

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postRegisterUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postRegisterUserSchema);

    const result = await addUser(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postLoginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postLoginUserSchema);

    const data = await loginUser(req.body);

    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const patchMe = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchMeSchema);

    const result = await editUser({ id: req.user.id, ...req.body });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updatePassword = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, updatePasswordSchema);

    const result = await editUserPassword({ id: req.params.id, ...req.body });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const patchUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchUserSchema);

    const result = await editUser({ id: req.params.id, ...req.body });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getMe = async (req, res, next) => {
  try {
    const result = await showUser({ id: req.user.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getUsers = async (req, res, next) => {
  try {
    const result = await listUsers();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getUser = async (req, res, next) => {
  try {
    const result = await showUser({ id: req.params.id }, showUserSchema);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteMe = async (req, res, next) => {
  try {
    const result = await removeUser({ id: req.user.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteUser = async (req, res, next) => {
  try {
    const result = await removeUser({ id: req.params.id }, deleteUserSchmea);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updatePassword,
  postRegisterUser,
  postLoginUser,
  patchMe,
  getMe,
  getUser,
  getUsers,
  deleteMe,
  patchUser,
  deleteUser,
};
