const { User } = require("../models");

async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function createUser({ name, email, passwordHash, role }) {
  return User.create({ name, email, passwordHash, role: role || "USER" });
}

module.exports = { findByEmail, createUser };
