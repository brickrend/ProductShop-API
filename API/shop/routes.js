const express = require("express");
const multer = require("multer");

const {
  getList,
  createShop,
  fetchShop,
  createProduct,
} = require("./controllers");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const error = new Error("Product not found");
    error.status = 404;
    next(error);
  }
});

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", getList);

router.post("/", upload.single("image"), createShop);

router.post("/:shopId/product", upload.single("image"), createProduct);

module.exports = router;
