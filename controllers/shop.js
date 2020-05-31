const Product = require("../models/product");
const Order = require("../models/orders");

exports.getIndex = (req, res) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        pageTitle: "index",
        path: "/",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        pageTitle: "Products",
        path: "/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (product) {
        res.render("shop/product-detail", {
          pageTitle: product.title,
          path: "/products",
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

exports.getCart = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      if (product) {
        return req.user.addToCart(product);
      } else {
        res.status(404).render("404", { pageTitle: "Oops", path: "/404" });
      }
    })
    .then((result) => {
      // console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res) => {
  Order.find()
    .then((order) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders: order,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddOrder = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { product: { ...i.productId._doc }, quantity: i.quantity };
      });
      const order = new Order({
        products: products,
        user: {
          name: req.user.name,
          userId: req.user,
        },
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((reuslt) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
