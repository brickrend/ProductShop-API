const slugify = require("slugify");
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

exports.deleteProduct = (req, res) => {
  const productId = req.params.productId;

  const foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.json(products).status(204).end;
  } else {
    res.status(404).json({ message: "not found" });
  }
};

exports.createProduct = (req, res) => {
  const id = products.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = {
    id,
    slug,
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const productId = req.params.productId;

  let foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    for (let key in req.body) foundProduct[key] = req.body[key];

    foundProduct.slug = slugify(foundProduct.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "not found" });
  }
};
