"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const adminPass = await bcrypt.hash("Admin@123", 10);
    const userPass = await bcrypt.hash("User@123", 10);

    await queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@newsportal.com",
        passwordHash: adminPass,
        role: "ADMIN",
        createdAt: now,
        updatedAt: now
      },
      {
        name: "User",
        email: "user@newsportal.com",
        passwordHash: userPass,
        role: "USER",
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
