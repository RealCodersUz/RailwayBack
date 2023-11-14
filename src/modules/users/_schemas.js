const Joi = require("joi");

exports.postRegisterUserSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    branch_name: Joi.string().required(),
    role: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string().required().min(4),
  }),
};

exports.postLoginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.patchMeSchema = {
  body: Joi.object({
    name: Joi.string(),
    branch_name: Joi.string(),
    password: Joi.string(),
  }),
};

exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    name: Joi.string(),
    branch_name: Joi.string(),
    username: Joi.string(),
  }),
};

exports.updatePasswordSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    password: Joi.string().required(),
  }),
};

exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
