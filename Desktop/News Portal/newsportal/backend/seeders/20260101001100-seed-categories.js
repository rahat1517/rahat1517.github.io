"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert("categories", [
      { name: "Politics", slug: "politics", createdAt: now, updatedAt: now },
      { name: "Sports", slug: "sports", createdAt: now, updatedAt: now },
      { name: "Technology", slug: "technology", createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
