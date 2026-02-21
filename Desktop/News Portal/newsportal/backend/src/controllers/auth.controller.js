const authService = require("../services/auth.service");
const { ok } = require("../utils/response");

async function register(req, res, next) {
  try {
    const data = await authService.register(req.body);
    return ok(res, data, "Registered");
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body);
    return ok(res, data, "Logged in");
  } catch (e) {
    next(e);
  }
}

module.exports = { register, login };
