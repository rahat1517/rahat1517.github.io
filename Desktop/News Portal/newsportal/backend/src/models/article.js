const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Article = sequelize.define(
    "Article",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING(200), allowNull: false },
      slug: { type: DataTypes.STRING(240), allowNull: false, unique: true },
      summary: { type: DataTypes.STRING(500), allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      authorId: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false }
    },
    { tableName: "articles", timestamps: true }
  );
  return Article;
};
