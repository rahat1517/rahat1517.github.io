const articleRepo = require("../repositories/article.repo");
const categoryRepo = require("../repositories/category.repo");

function httpError(status, message) {
  const e = new Error(message);
  e.status = status;
  return e;
}

async function list({ categoryId, q }) {
  return articleRepo.listArticles({ categoryId, q });
}

async function getBySlug(slug) {
  const article = await articleRepo.getArticleBySlug(slug);
  if (!article) throw httpError(404, "Article not found");
  return article;
}

async function create(authorId, payload) {
  const cat = await categoryRepo.findCategoryById(payload.categoryId);
  if (!cat) throw httpError(400, "Invalid categoryId");

  return articleRepo.createArticle({ ...payload, authorId });
}

async function update(user, id, payload) {
  const article = await articleRepo.findArticleById(id);
  if (!article) throw httpError(404, "Article not found");

  if (user.role !== "ADMIN" && article.authorId !== user.id) {
    throw httpError(403, "You can only edit your own articles");
  }

  if (payload.categoryId) {
    const cat = await categoryRepo.findCategoryById(payload.categoryId);
    if (!cat) throw httpError(400, "Invalid categoryId");
  }

  return articleRepo.updateArticle(article, payload);
}

async function remove(user, id) {
  const article = await articleRepo.findArticleById(id);
  if (!article) throw httpError(404, "Article not found");

  if (user.role !== "ADMIN" && article.authorId !== user.id) {
    throw httpError(403, "You can only delete your own articles");
  }

  await articleRepo.deleteArticle(article);
  return { deleted: true };
}

module.exports = { list, getBySlug, create, update, remove };
