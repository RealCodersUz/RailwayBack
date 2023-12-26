const Joi = require("joi");

exports.postValuesSchema = {
  body: Joi.object({
    year: Joi.string(),
    month: Joi.string(),
    values: Joi.array(),
    names: Joi.array(),
    branch_name: Joi.string(),
  }),
};

exports.showAdmDataSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchValuesSchema = {
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

exports.deleteValuesSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
