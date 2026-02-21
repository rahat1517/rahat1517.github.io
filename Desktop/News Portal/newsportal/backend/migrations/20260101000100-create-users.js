"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(120), allowNull: false },
      email: { type: Sequelize.STRING(180), allowNull: false, unique: true },
      passwordHash: { type: Sequelize.STRING(255), allowNull: false },
      role: {
        type: Sequelize.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER"
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  }
};
