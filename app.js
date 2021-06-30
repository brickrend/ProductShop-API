// express
const express = require("express");
// data
let products = require("./data");
//cors
const cors = require("cors");
const bodyParser = require("body-parser");

//components
const slugify = require("slugify");

const app = express();

//midlleware
app.use(cors());
app.use(bodyParser.json());

app.get("/product", (req, res) => {
  res.json(products);
});

app.delete("/product/:productId", (req, res) => {
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
});

app.post("/product", (req, res) => {
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
});

app.listen(8000, () => {
  console.log("working");
});
