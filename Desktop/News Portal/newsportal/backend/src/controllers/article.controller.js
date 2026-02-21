const articleService = require("../services/article.service");
const { ok } = require("../utils/response");

async function list(req, res, next) {
  try {
    const { categoryId, q } = req.query;
    const data = await articleService.list({
      categoryId: categoryId ? Number(categoryId) : undefined,
      q: q ? String(q) : undefined
    });
    return ok(res, data);
  } catch (e) {
    next(e);
  }
}

async function getBySlug(req, res, next) {
  try {
    const data = await articleService.getBySlug(req.params.slug);
    return ok(res, data);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const data = await articleService.create(req.user.id, req.body);
    return ok(res, data, "Article created");
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const data = await articleService.update(req.user, Number(req.params.id), req.body);
    return ok(res, data, "Article updated");
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const data = await articleService.remove(req.user, Number(req.params.id));
    return ok(res, data, "Article deleted");
  } catch (e) {
    next(e);
  }
}

module.exports = { list, getBySlug, create, update, remove };
