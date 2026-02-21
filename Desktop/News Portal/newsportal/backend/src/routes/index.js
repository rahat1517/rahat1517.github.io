const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/categories", require("./category.routes"));
router.use("/articles", require("./article.routes"));

module.exports = router;
