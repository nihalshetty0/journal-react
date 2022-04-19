const Joi = require("joi");

const registerValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const loginValidate = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const journalValidate = Joi.object({
  title: Joi.string().required(),
  text: Joi.string(),
});
module.exports = { registerValidate, loginValidate, journalValidate };
