const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/product", productController.showProducts);
router.post("/addProduct", productController.addProduct);
router.post("/deleteProduct", productController.deleteProduct);
router.post("/updateProduct", productController.updateProduct);
router.post("/addStore", productController.addStore);
router.post("/deleteStore", productController.deleteStore);
router.post("/stockCalculator", productController.stockCalculator);
router.post("/revenueCalculator", productController.revenueCalculator);

module.exports = router;
