const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postRasxodSchema,
  // patchValuesSchema,
  showRasxodSchema,
  deleteRasxodSchmea,
} = require("./_schemas");
//
const addRasxod = require("./add_rasxod");
// const editValues = require("./edit_Values");
const showRasxod = require("./show-rasxod");
const removeRasxod = require("./remove-rasxod");
const listRasxod = require("./list_rasxod");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postRasxod = async (req, res, next) => {
  try {
    // console.log({ ...req.user }, "user");

    httpValidator({ body: req.body }, postRasxodSchema);
    const result = await addRasxod(req.body, req.user);

    res.status(200).json({
      ...result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
// const patchArchive = async (req, res, next) => {
//   try {
//     httpValidator({ body: req.body }, patchArchiveSchema);

//     const result = await editArchive({ id: req.params.id, ...req.body });

//     res.status(200).json({
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getRasxods = async (req, res, next) => {
  try {
    const result = await listRasxod(req.query);

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

const getRasxod = async (req, res, next) => {
  try {
    const result = await showRasxod({ id: req.params.id }, showRasxodSchema);

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
const deleteRasxod = async (req, res, next) => {
  try {
    const result = await removeRasxod(
      { id: req.params.id },
      deleteRasxodSchmea
    );

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postRasxod,
  getRasxods,
  getRasxod,
  // patchArchive,
  deleteRasxod,
};
