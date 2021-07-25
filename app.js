// express
const express = require("express");
// passport
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");

//cors
const cors = require("cors");
const bodyParser = require("body-parser");

//Routers
const productRouter = require("./API/game/routes");
const shopRouter = require("./API/shop/routes");
const userRouter = require("./API/user/routes");
// database
const db = require("./db/models/index");

const app = express();

//midlleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//routes
app.use("/product", productRouter);
app.use("/shop", shopRouter);
app.use(userRouter);
app.use("/media", express.static("media"));

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message } || "Internal Server Error.");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.listen(8000, () => {
  console.log("working");
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("connation to data base approved");
    app.listen(8001, () => {
      console.log("working");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
