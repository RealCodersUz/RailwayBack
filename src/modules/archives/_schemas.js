const Joi = require("joi");

exports.postArchiveSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    branch_name: Joi.string().required(),
    type: Joi.string().required(),
    date: Joi.string().required(),
  }),
};

exports.showArchiveSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchArchiveSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string(),
    branch_name: Joi.string(),
    type: Joi.string(),
  }),
};

exports.deleteArchiveSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
