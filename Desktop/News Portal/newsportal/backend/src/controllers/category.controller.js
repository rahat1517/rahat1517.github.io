const categoryService = require("../services/category.service");
const { ok } = require("../utils/response");

async function list(req, res, next) {
  try {
    const data = await categoryService.list();
    return ok(res, data);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const data = await categoryService.create(req.body);
    return ok(res, data, "Category created");
  } catch (e) {
    next(e);
  }
}

module.exports = { list, create };
