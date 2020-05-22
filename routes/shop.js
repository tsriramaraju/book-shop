const express = require("express");
const router = express.Router();

const controller = require("../controllers/shop");

router.get("/", controller.getIndex);

// router.get("/products", controller.getProducts);

// router.get("/products/:productId", controller.getProduct);

// router.get("/cart", controller.getCart);

// router.post("/cart", controller.postCart);

// router.post("/cart-delete-item", controller.postCartDeleteProduct);

// router.get("/orders", controller.getOrders);
module.exports = router;
