const { Product, Shop } = require("../../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.getList = async (req, res, next) => {
  try {
    const product = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["name"],
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    await req.product.update(req.body);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
