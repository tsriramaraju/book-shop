const User = require("../models/users");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoogedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5eca4065b2895a221cbd98f8")
    .then((user) => {
      req.session.user = user;
      req.session.isLoogedIn = true;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
