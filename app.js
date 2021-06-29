// express
const express = require("express");
// data
const products = require("./data");
//cors
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/product", (req, res) => {
  res.json(products);
});

app.listen(8000, () => {
  console.log("workding");
});
