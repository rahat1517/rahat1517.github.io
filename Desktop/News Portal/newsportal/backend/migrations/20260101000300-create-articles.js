"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("articles", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(200), allowNull: false },
      slug: { type: Sequelize.STRING(240), allowNull: false, unique: true },
      summary: { type: Sequelize.STRING(500), allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "categories", key: "id" },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("articles");
  }
};
