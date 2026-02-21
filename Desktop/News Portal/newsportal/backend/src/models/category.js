const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(80), allowNull: false, unique: true },
      slug: { type: DataTypes.STRING(120), allowNull: false, unique: true }
    },
    { tableName: "categories", timestamps: true }
  );
  return Category;
};
