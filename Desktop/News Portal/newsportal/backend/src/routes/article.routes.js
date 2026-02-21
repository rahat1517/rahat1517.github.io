const router = require("express").Router();
const articleController = require("../controllers/article.controller");
const { authRequired } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { createArticleSchema, updateArticleSchema } = require("../validators/article.validators");

router.get("/", articleController.list);
router.get("/:slug", articleController.getBySlug);

router.post("/", authRequired, validate(createArticleSchema), articleController.create);
router.patch("/:id", authRequired, validate(updateArticleSchema), articleController.update);
router.delete("/:id", authRequired, articleController.remove);

module.exports = router;
