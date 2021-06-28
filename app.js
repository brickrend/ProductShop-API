const express = require("express");
// data
const products = require("./data");
// express
const app = express();

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8000, () => {
  console.log("boom wsdorked");
});
