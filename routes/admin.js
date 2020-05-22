//#region imports
const express = require("express");
const router = express.Router();

const controller = require("../controllers/admin");
//#endregion

// router.get("/add-product", controller.getAddProducts);

// router.post("/add-product", controller.postAddProducts);

// router.post("/edit-product", controller.postEditProduct);

// router.post("/update-product", controller.postUpdateProduct);

// router.post("/delete-product", controller.postDeleteProduct);

// router.get("/products", controller.getProducts);

exports.routes = router;
