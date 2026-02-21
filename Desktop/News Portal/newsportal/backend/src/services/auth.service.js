const userRepo = require("../repositories/user.repo");
const { hashPassword, verifyPassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");

function httpError(status, message) {
  const e = new Error(message);
  e.status = status;
  return e;
}

async function register({ name, email, password }) {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw httpError(409, "Email already exists");

  const passwordHash = await hashPassword(password);
  const user = await userRepo.createUser({ name, email, passwordHash, role: "USER" });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

async function login({ email, password }) {
  const user = await userRepo.findByEmail(email);
  if (!user) throw httpError(401, "Invalid credentials");

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw httpError(401, "Invalid credentials");

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

module.exports = { register, login };
