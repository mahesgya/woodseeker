const express = require("express");
const router = express.Router();
const { getAllProductsController, createProductController, updateProductController, deleteProductController } = require("./productController");

router.get("/products", getAllProductsController);
router.post("/products", createProductController);
router.put("/products", updateProductController);
router.delete("/products/:id", deleteProductController);

module.exports = router;
