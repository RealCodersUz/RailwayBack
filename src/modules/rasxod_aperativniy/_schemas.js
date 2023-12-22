const Joi = require("joi");

exports.postRasxodSchema = {
  body: Joi.object({
    year: Joi.string(),
    month: Joi.string(),
    values: Joi.array(),
    file: Joi.array(),
    branch_name: Joi.string(),
  }),
};

exports.showRasxodSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchRasxodSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string(),
    branch_name: Joi.string(),
    type: Joi.string(),
    month: Joi.string(),
  }),
};

exports.deleteRasxodSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
