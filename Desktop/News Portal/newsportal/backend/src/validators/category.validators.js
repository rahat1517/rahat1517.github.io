const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  slug: Joi.string().min(2).max(120).regex(/^[a-z0-9-]+$/).required()
});

module.exports = { createCategorySchema };
