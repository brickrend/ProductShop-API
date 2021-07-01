const express = require("express");

const {
  getList,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("./constrollers");
const router = express.Router();

// product List
router.get("/", getList);

// product delete
router.delete("/:productId", deleteProduct);

// product create
router.post("/", createProduct);

// product update
router.put("/:productId", updateProduct);

module.exports = router;
