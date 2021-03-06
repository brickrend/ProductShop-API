const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    (product = {
      name: { type: DataTypes.STRING, allowNull: false },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: { type: DataTypes.STRING },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 1 },
      },
      image: { type: DataTypes.STRING },
    })
  );
  SequelizeSlugify.slugifyModel(Product, { source: ["name"] });
  return Product;
};
