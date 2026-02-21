const { sequelize } = require("../config/db");
const User = require("./user")(sequelize);
const Category = require("./category")(sequelize);
const Article = require("./article")(sequelize);

// Associations
User.hasMany(Article, { foreignKey: "authorId", as: "articles" });
Article.belongsTo(User, { foreignKey: "authorId", as: "author" });

Category.hasMany(Article, { foreignKey: "categoryId", as: "articles" });
Article.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

module.exports = { sequelize, User, Category, Article };
