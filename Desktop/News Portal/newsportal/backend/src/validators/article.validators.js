const Joi = require("joi");

const createArticleSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  slug: Joi.string().min(5).max(240).regex(/^[a-z0-9-]+$/).required(),
  summary: Joi.string().min(10).max(500).required(),
  content: Joi.string().min(20).required(),
  published: Joi.boolean().optional(),
  categoryId: Joi.number().integer().positive().required()
});

const updateArticleSchema = Joi.object({
  title: Joi.string().min(5).max(200).optional(),
  slug: Joi.string().min(5).max(240).regex(/^[a-z0-9-]+$/).optional(),
  summary: Joi.string().min(10).max(500).optional(),
  content: Joi.string().min(20).optional(),
  published: Joi.boolean().optional(),
  categoryId: Joi.number().integer().positive().optional()
}).min(1);

module.exports = { createArticleSchema, updateArticleSchema };
