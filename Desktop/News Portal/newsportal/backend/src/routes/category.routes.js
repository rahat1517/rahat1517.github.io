const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const { validate } = require("../middleware/validate.middleware");
const { createCategorySchema } = require("../validators/category.validators");
const { authRequired, requireRole } = require("../middleware/auth.middleware");

router.get("/", categoryController.list);
router.post("/", authRequired, requireRole("ADMIN"), validate(createCategorySchema), categoryController.create);

module.exports = router;
