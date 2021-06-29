// express
const express = require("express");
// data
let products = require("./data");
//cors
const cors = require("cors");

const app = express();

app.use(cors());

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

app.listen(8000, () => {
  console.log("working");
});
