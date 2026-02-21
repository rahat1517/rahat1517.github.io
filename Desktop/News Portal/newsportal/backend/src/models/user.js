const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false },
      email: { type: DataTypes.STRING(180), allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING(255), allowNull: false },
      role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER"
      }
    },
    { tableName: "users", timestamps: true }
  );

  return User;
};
