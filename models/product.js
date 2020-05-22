const fs = require("fs");
const path = require("path");

const dirName = require("../utils/pathHelper");

const filePath = path.join(dirName, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const prodindex = products.findIndex((prod) => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[prodindex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          console.log("error in updating file " + err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log("error in writing file " + err);
        });
      }
    });
  }

  static fetchProducts(cb) {
    getProductsFromFile(cb);
  }

  static findProductByID(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static deleteProduct(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        console.log("file deletion error" + err);
      });
    });
  }
};
