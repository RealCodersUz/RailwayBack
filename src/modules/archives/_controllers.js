const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postArchiveSchema,
  patchArchiveSchema,
  showArchiveSchema,
  deleteArchiveSchmea,
} = require("./_schemas");
//
const addArchive = require("./add_archive");
const editArchive = require("./edit_archive");
const showArchive = require("./show-archive");
const removeArchive = require("./remove-archive");
const listArchives = require("./list_archives");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postArchive = async (req, res, next) => {
  try {
    console.log({ ...req.user }, "user");
    console.log(req?.file?.originalname, "file");

    httpValidator({ body: req.body }, postArchiveSchema);
    const result = await addArchive(req.body, req.user, req.file.filename);

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
const patchArchive = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchArchiveSchema);

    const result = await editArchive({ id: req.params.id, ...req.body });

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
const getArchives = async (req, res, next) => {
  try {
    const result = await listArchives(req.query);

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

const getArchive = async (req, res, next) => {
  try {
    const result = await showArchive({ id: req.params.id }, showArchiveSchema);

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
const deleteArchive = async (req, res, next) => {
  try {
    const result = await removeArchive(
      { id: req.params.id },
      deleteArchiveSchmea
    );

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postArchive,
  getArchive,
  getArchives,
  patchArchive,
  deleteArchive,
};
