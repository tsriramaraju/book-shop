const Product = require("../models/product");

exports.getAddProducts = (req, res) => {
  res.render("admin/edit-product", {
    editing: false,
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProducts = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const products = new Product(null, title, imageUrl, price, description);
  products.save();
  res.redirect("/admin/products");
};

exports.postUpdateProduct = (req, res) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const products = new Product(id, title, imageUrl, price, description);
  products.save();
  res.redirect("/admin/products");
};

exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;
  Product.findProductByID(productId, (product) => {
    if (product) {
      res.render("admin/edit-product", {
        editing: true,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        product: product,
      });
    } else {
      res.status(404).render("404", { pageTitle: "Oops", path: "/404" });
    }
  });
};

exports.getProducts = (req, res) => {
  Product.fetchProducts((products) => {
    res.render("admin/products", {
      pageTitle: "Products",
      path: "/admin/products",
      prods: products,
    });
  });
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};
