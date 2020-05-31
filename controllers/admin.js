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
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUpdateProduct = (req, res) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then((product) => {
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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      // console.log(products);
      res.render("admin/products", {
        pageTitle: "Products",
        path: "/admin/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.findByIdAndRemove(productId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
