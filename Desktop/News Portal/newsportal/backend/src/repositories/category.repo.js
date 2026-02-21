const { Category } = require("../models");

async function listCategories() {
  return Category.findAll({ order: [["name", "ASC"]] });
}

async function createCategory(payload) {
  return Category.create(payload);
}

async function findCategoryById(id) {
  return Category.findByPk(id);
}

module.exports = { listCategories, createCategory, findCategoryById };
