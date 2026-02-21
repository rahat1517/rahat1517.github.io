const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { validate } = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validators");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
