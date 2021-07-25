const express = require("express");
const multer = require("multer");

const {
  getList,
  deleteProduct,
  updateProduct,
  fetchProduct,
} = require("./controllers");

const { createProduct } = require("../shop/controllers");

const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error("Product not found");
    error.status = 404;
    next(error);
  }
});

// multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// product List
router.get("/", getList);

// product delete
router.delete("/:productId", deleteProduct);

// product create
router.post("/", upload.single("image"), createProduct);

// product update
router.put("/:productId", upload.single("image"), updateProduct);

module.exports = router;
