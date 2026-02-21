const categoryRepo = require("../repositories/category.repo");

async function list() {
  return categoryRepo.listCategories();
}

async function create(payload) {
  return categoryRepo.createCategory(payload);
}

module.exports = { list, create };
