const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postValuesSchema,
  // patchValuesSchema,
  showAdmDataSchema,
  deleteValuesSchmea,
} = require("./_schemas");
//
const addValues = require("./add_value");
// const editValues = require("./edit_Values");
const showAdmDAta = require("./show_adm_data");
// const removeAdmDAta = require("./remove-AdmDAta");
const listAdmDAta = require("./list_adm_data");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postValue = async (req, res, next) => {
  try {
    // console.log({ ...req.user }, "user");

    httpValidator({ body: req.body }, postValuesSchema);
    const result = await addValues(req.body, req.user);

    res.status(201).json({
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
const getAdmDAtas = async (req, res, next) => {
  try {
    const result = await listAdmDAta(req.query, req.user.id);

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

const getAdmData = async (req, res, next) => {
  try {
    const result = await showAdmDAta({ id: req.params.id }, showAdmDataSchema);

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
const deleteValue = async (req, res, next) => {
  try {
    const result = await removeValues(
      { id: req.params.id },
      deleteValuesSchmea
    );

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postValue,
  getAdmData,
  getAdmDAtas,
  // patchArchive,
  deleteValue,
};
