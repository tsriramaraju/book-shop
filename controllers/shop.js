const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res) => {
  res.send("holla");
};

// exports.getIndex = (req, res) => {
//   Product.fetchProducts((products) => {
//     res.render("shop/index", {
//       pageTitle: "index",
//       path: "/",
//       prods: products,
//     });
//   });
// };

// exports.getProducts = (req, res) => {
//   Product.fetchProducts((products) => {
//     res.render("shop/product-list", {
//       pageTitle: "Products",
//       path: "/products",
//       prods: products,
//     });
//   });
// };

// exports.getProduct = (req, res) => {
//   const productId = req.params.productId;

//   Product.findProductByID(productId, (product) => {
//     if (product) {
//       res.render("shop/product-detail", {
//         pageTitle: product.title,
//         path: "/products",
//         product: product,
//       });
//     } else {
//       res.status(404).render("404", { pageTitle: "Oops", path: "/404" });
//     }
//   });
// };

// exports.getCart = (req, res) => {
//   Cart.getCart((cart) => {
//     Product.fetchProducts((products) => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(
//           (prod) => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: cartProducts,
//       });
//     });
//   });
// };

// exports.postCart = (req, res) => {
//   const productId = req.body.productId;
//   Product.findProductByID(productId, (product) => {
//     if (product) {
//       Cart.addProducts(productId, product.price);
//       res.redirect("/cart");
//     } else {
//       res.status(404).render("404", { pageTitle: "Oops", path: "/404" });
//     }
//   });
// };

// exports.getOrders = (req, res) => {
//   Product.fetchProducts((products) => {
//     res.render("shop/orders", {
//       pageTitle: "Orders",
//       path: "/orders",
//     });
//   });
// };

// exports.postCartDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   Product.findProductByID(prodId, (product) => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect("/cart");
//   });
// };
