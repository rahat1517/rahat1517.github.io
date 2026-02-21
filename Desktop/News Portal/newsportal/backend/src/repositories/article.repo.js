const { Article, User, Category } = require("../models");

async function listArticles({ categoryId, q }) {
  const where = {};
  if (categoryId) where.categoryId = categoryId;

  const rows = await Article.findAll({
    where,
    include: [
      { model: User, as: "author", attributes: ["id", "name", "email"] },
      { model: Category, as: "category", attributes: ["id", "name", "slug"] }
    ],
    order: [["createdAt", "DESC"]]
  });

  if (!q) return rows;
  const lower = q.toLowerCase();
  return rows.filter((a) => a.title.toLowerCase().includes(lower) || a.summary.toLowerCase().includes(lower));
}

async function getArticleBySlug(slug) {
  return Article.findOne({
    where: { slug },
    include: [
      { model: User, as: "author", attributes: ["id", "name", "email"] },
      { model: Category, as: "category", attributes: ["id", "name", "slug"] }
    ]
  });
}

async function createArticle(payload) {
  return Article.create(payload);
}

async function findArticleById(id) {
  return Article.findByPk(id);
}

async function updateArticle(article, payload) {
  return article.update(payload);
}

async function deleteArticle(article) {
  return article.destroy();
}

module.exports = {
  listArticles,
  getArticleBySlug,
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle
};
