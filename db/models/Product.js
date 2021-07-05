module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",
    (product = {
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      price: { type: DataTypes.INTEGER },
      image: { type: DataTypes.STRING },
    })
  );
};
