let products = require("../data");
const slugify = require("slugify");

exports.getList = (req, res) => {
  res.json(products);
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  const foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    console.log(products);
    res.json(products).status(204).end;
  } else {
    res.status(404).json({ message: "not found" });
  }
};

exports.createProduct = (req, res) => {
  console.log(req);
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
  console.log(productId);
  let foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    for (let key in req.body) foundProduct[key] = req.body[key];
    console.log(foundProduct);
    foundProduct.slug = slugify(foundProduct.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "not found" });
  }
};
