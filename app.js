// express
const express = require("express");
// data
let products = require("./data");
//cors
const cors = require("cors");
const bodyParser = require("body-parser");

//components
const productRouter = require("./API/game/routes");
// database
const db = require("./db/models/index");
// const e = require("express");

const app = express();

//midlleware
app.use(cors());
app.use(bodyParser.json());
app.use("/product", productRouter);

// app.get("/product", (req, res) => {
//   res.json(products);
// });

// app.delete("/product/:productId", (req, res) => {
//   const productId = req.params.productId;
//   console.log(productId);
//   const foundProduct = products.find((product) => product.id === +productId);

//   if (foundProduct) {
//     products = products.filter((product) => product.id !== +productId);
//     console.log(products);
//     res.json(products).status(204).end;
//   } else {
//     res.status(404).json({ message: "not found" });
//   }
// });

// app.post("/product", (req, res) => {
//   console.log(req);
//   const id = products.length + 1;
//   const slug = slugify(req.body.name, { lower: true });
//   const newProduct = {
//     id,
//     slug,
//     ...req.body,
//   };
//   products.push(newProduct);
//   res.status(201).json(newProduct);
// });

// app.put("/product/:productId", (req, res) => {
//   const productId = req.params.productId;
//   console.log(productId);
//   let foundProduct = products.find((product) => product.id === +productId);

//   if (foundProduct) {
//     for (let key in req.body) foundProduct[key] = req.body[key];
//     console.log(foundProduct);
//     foundProduct.slug = slugify(foundProduct.name, { lower: true });
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "not found" });
//   }
// });

app.listen(8000, () => {
  console.log("working");
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("connation to data base approved");
    app.listen(8001, () => {
      console.log("working");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
