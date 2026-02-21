"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert("articles", [
      {
        title: "Welcome to NewsPortal",
        slug: "welcome-to-newsportal",
        summary: "This is a seeded article for your assignment demo.",
        content: "Full content goes here. You can replace this with real text.",
        published: true,
        authorId: 1,
        categoryId: 3,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("articles", null, {});
  }
};
