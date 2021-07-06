const { Product } = require("../../db/models");

exports.getList = async (req, res) => {
  try {
    const product = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const foundProduct = await Product.findByPk(productId);

    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    let foundProduct = await Product.findByPk(productId);

    if (foundProduct) {
      await foundProduct.update(req.body);

      res.status(204).end();
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
