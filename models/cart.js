const fs = require("fs");
const path = require("path");

const dirName = require("../utils/pathHelper");

const filePath = path.join(dirName, "data", "cart.json");

module.exports = class Cart {
  static addProducts(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingIndex];
      let updatedProduct;
      console.log("existign product" + existingProduct);
      if (existingProduct) {
        console.log("existing" + existingProduct);
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log("cart Adding error" + err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
